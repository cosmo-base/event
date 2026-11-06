// ===========================================================================
// Cosmo Base イベント管理 GAS バックエンド
//
// 設定方法:
// 1. スクリプトプロパティ (ファイル > プロジェクトのプロパティ > スクリプトのプロパティ) に設定:
//    - GITHUB_TOKEN: GitHub Personal Access Token (repo:workflow スコープ)
//    - GITHUB_OWNER: リポジトリオーナー (例: cosmo-base)
//    - GITHUB_REPO:  リポジトリ名 (例: event)
//    - GOOGLE_CLIENT_ID: Google OAuth クライアントID
// 2. ウェブアプリとしてデプロイ:
//    - 「次のユーザーとして実行」: 自分
//    - 「アクセスできるユーザー」: 全員
// 3. デプロイしたURLを next.config.mjs の NEXT_PUBLIC_GAS_URL 環境変数に設定
// ===========================================================================

const SPREADSHEET_ID = '1McVQPynPJvZy3AFnQRZ5xMveoh4smm1StzIZhbdtlXY';

// ───────────────────────────────────────────────────────────────
// エントリーポイント
// ───────────────────────────────────────────────────────────────

function doGet(e) {
  const params = e.parameter;
  const action = params.action || 'events';
  const callback = params.callback;

  let result;
  try {
    if (action === 'events') {
      result = getPublishedEvents();
    } else if (action === 'event' && params.id) {
      result = getEventAllData(params.id);
    } else if (action === 'all') {
      result = getAllEventsData();
    } else {
      result = { error: 'Unknown action' };
    }
  } catch (err) {
    result = { error: err.message };
  }

  const json = JSON.stringify(result);

  if (callback) {
    return ContentService.createTextOutput(`${callback}(${json})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const { idToken, action, data } = body;

  if (!idToken) {
    return jsonResponse({ error: 'idToken required' }, 401);
  }

  const adminEmail = verifyAdmin(idToken);
  if (!adminEmail) {
    return jsonResponse({ error: 'Unauthorized' }, 403);
  }

  try {
    let result;
    switch (action) {
      case 'getEvents':
        result = getAllEventsForAdmin();
        break;
      case 'createEvent':
        result = createEvent(data, adminEmail);
        break;
      case 'updateEvent':
        result = updateEvent(data.eventId, data, adminEmail);
        break;
      case 'deleteEvent':
        result = deleteEvent(data.eventId);
        break;
      case 'publishEvent':
        result = setEventPublished(data.eventId, true);
        break;
      case 'unpublishEvent':
        result = setEventPublished(data.eventId, false);
        break;
      case 'triggerBuild':
        result = triggerGitHubBuild(adminEmail);
        break;
      case 'updateSection':
        result = updateSection(data.section, data.eventId, data.rows);
        break;
      default:
        return jsonResponse({ error: 'Unknown action' }, 400);
    }
    return jsonResponse({ ok: true, result });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function jsonResponse(data, status) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ───────────────────────────────────────────────────────────────
// 認証
// ───────────────────────────────────────────────────────────────

function verifyAdmin(idToken) {
  try {
    const props = PropertiesService.getScriptProperties();
    const clientId = props.getProperty('GOOGLE_CLIENT_ID');

    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const payload = JSON.parse(res.getContentText());

    if (payload.error) return null;
    if (clientId && payload.aud !== clientId) return null;

    const email = payload.email;
    if (!email || !payload.email_verified) return null;

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Admins');
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === email) return email;
    }
    return null;
  } catch {
    return null;
  }
}

// ───────────────────────────────────────────────────────────────
// データ取得 (公開用)
// ───────────────────────────────────────────────────────────────

function getPublishedEvents() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  return rows
    .filter(r => r[headers.indexOf('published')] === true || r[headers.indexOf('published')] === 'TRUE')
    .map(r => rowToObject(headers, r));
}

function getAllEventsForAdmin() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  return rows.map(r => rowToObject(headers, r));
}

function getEventAllData(eventId) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const event = getEventRow(ss, eventId);
  if (!event) return null;

  return {
    site: buildSiteData(event),
    event: buildEventData(event),
    carousel: getSheetRowsForEvent(ss, 'Carousel', eventId).map(r => ({
      id: r.id,
      order: parseInt(r.order),
      title: r.title,
      description: r.description,
      buttonLabel: r.buttonLabel,
      href: r.href,
      external: r.external === 'TRUE' || r.external === true,
      gradient: r.gradient,
      centered: r.centered === 'TRUE' || r.centered === true,
      label: r.label || undefined,
    })).sort((a, b) => a.order - b.order),
    quickLinks: getSheetRowsForEvent(ss, 'QuickLinks', eventId).map(r => ({
      id: r.id,
      order: parseInt(r.order),
      title: r.title,
      description: r.description,
      href: r.href,
      icon: r.icon,
      external: r.external === 'TRUE' || r.external === true,
      featured: r.featured === 'TRUE' || r.featured === true || undefined,
      event: r.event || undefined,
    })).sort((a, b) => a.order - b.order),
    spaceType: buildSpaceTypeData(ss, eventId),
    contents: getSheetRowsForEvent(ss, 'Contents', eventId).map(r => ({
      id: r.id,
      order: parseInt(r.order),
      title: r.title,
      description: r.description,
      href: r.href,
      duration: r.duration || undefined,
      audience: r.audience,
      labels: r.labels ? r.labels.split('|') : [],
      status: r.status,
      external: r.external === 'TRUE' || r.external === true,
      icon: r.icon || undefined,
      imageUrl: r.imageUrl || undefined,
    })).sort((a, b) => a.order - b.order),
    limitedContents: getSheetRowsForEvent(ss, 'LimitedContents', eventId).map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      href: r.href,
      labels: r.labels ? r.labels.split('|') : [],
      status: r.status,
      external: r.external === 'TRUE' || r.external === true,
    })),
    pitch: buildPitchData(ss, eventId),
    communityCta: buildCommunityCta(ss, eventId),
  };
}

function getAllEventsData() {
  const events = getPublishedEvents();
  const result = {};
  for (const ev of events) {
    result[ev.eventId] = getEventAllData(ev.eventId);
  }
  return result;
}

// ───────────────────────────────────────────────────────────────
// データ構築ヘルパー
// ───────────────────────────────────────────────────────────────

function buildSiteData(event) {
  return {
    pageTitle: event.pageTitle,
    pageDescription: event.pageDescription,
    siteName: 'Cosmo Base',
    url: 'https://event.fsif.jp/' + event.eventId,
    logoUrl: '/CB_logo.png',
    fsifLogoUrl: '/FSIF_logo.png',
    accentColor: event.accentColor || '#f59e0b',
    ogImage: event.ogImage || '/images/hero-event.png',
    noindex: event.noindex === 'TRUE' || event.noindex === true,
  };
}

function buildEventData(event) {
  return {
    name: event.name,
    shortName: event.shortName,
    date: event.date,
    venue: event.venue,
    boothNumber: event.boothNumber || '',
    pitchTime: event.pitchTime || '',
    participationType: event.participationType,
    exhibitorName: event.exhibitorName,
    message: event.message || '',
    reportUrl: event.reportUrl || '',
  };
}

function buildSpaceTypeData(ss, eventId) {
  const rows = getSheetRowsForEvent(ss, 'SpaceType', eventId);
  if (!rows.length) return null;
  const r = rows[0];
  return {
    badges: r.badges ? r.badges.split('|') : [],
    title: r.title,
    description: r.description,
    duration: r.duration,
    questionCount: r.questionCount,
    requirement: r.requirement,
    buttonLabel: r.buttonLabel,
    href: r.href,
    imageUrl: r.imageUrl || undefined,
  };
}

function buildPitchData(ss, eventId) {
  const rows = getSheetRowsForEvent(ss, 'Pitch', eventId);
  const posters = getSheetRowsForEvent(ss, 'Posters', eventId)
    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
    .map(p => ({ title: p.title, embedUrl: p.embedUrl, pdfUrl: p.pdfUrl || undefined, downloadName: p.downloadName || undefined }));

  if (!rows.length) return { title: '', presentationTitle: '', description: '', speakerName: '', presentationDate: '', slideUrl: '', posters };
  const r = rows[0];
  return {
    title: r.title || '',
    eyebrow: r.eyebrow || undefined,
    sectionDescription: r.sectionDescription || undefined,
    pitchLockFrom: r.pitchLockFrom || undefined,
    pitchLockUntil: r.pitchLockUntil || undefined,
    presentationTitle: r.presentationTitle || '',
    description: r.description || '',
    speakerName: r.speakerName || '',
    presentationDate: r.presentationDate || '',
    presentationTime: r.presentationTime || undefined,
    thumbnailUrl: r.thumbnailUrl || undefined,
    slideUrl: r.slideUrl || '',
    embedUrl: r.embedUrl || undefined,
    pdfUrl: r.pdfUrl || undefined,
    pdfDownloadName: r.pdfDownloadName || undefined,
    supplementaryUrl: r.supplementaryUrl || undefined,
    posters,
  };
}

function buildCommunityCta(ss, eventId) {
  const rows = getSheetRowsForEvent(ss, 'CommunityCta', eventId);
  if (!rows.length) return null;
  const r = rows[0];
  let secondaryLinks = [];
  try { secondaryLinks = JSON.parse(r.secondaryLinks || '[]'); } catch {}
  return {
    title: r.title,
    description: r.description,
    primaryLabel: r.primaryLabel,
    primaryHref: r.primaryHref,
    secondaryLinks,
  };
}

// ───────────────────────────────────────────────────────────────
// CRUD
// ───────────────────────────────────────────────────────────────

function createEvent(data, createdBy) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const now = new Date().toISOString();
  const row = headers.map(h => {
    if (h === 'createdAt' || h === 'updatedAt') return now;
    if (h === 'published') return false;
    return data[h] !== undefined ? data[h] : '';
  });

  sheet.appendRow(row);
  return { eventId: data.eventId };
}

function updateEvent(eventId, data, updatedBy) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const idx = rows.findIndex(r => r[0] === eventId);
  if (idx < 0) throw new Error('Event not found: ' + eventId);

  const rowNum = idx + 2;
  const updatedRow = headers.map((h, i) => {
    if (h === 'updatedAt') return new Date().toISOString();
    if (h === 'eventId') return eventId;
    return data[h] !== undefined ? data[h] : rows[idx][i];
  });
  sheet.getRange(rowNum, 1, 1, headers.length).setValues([updatedRow]);
  return { eventId };
}

function deleteEvent(eventId) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const idx = rows.findIndex(r => r[0] === eventId);
  if (idx < 0) throw new Error('Event not found: ' + eventId);
  sheet.deleteRow(idx + 2);
  return { eventId };
}

function setEventPublished(eventId, published) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const idx = rows.findIndex(r => r[0] === eventId);
  if (idx < 0) throw new Error('Event not found: ' + eventId);

  const publishedCol = headers.indexOf('published') + 1;
  const updatedAtCol = headers.indexOf('updatedAt') + 1;
  sheet.getRange(idx + 2, publishedCol).setValue(published);
  sheet.getRange(idx + 2, updatedAtCol).setValue(new Date().toISOString());
  return { eventId, published };
}

function updateSection(section, eventId, rows) {
  const allowed = ['Carousel', 'QuickLinks', 'SpaceType', 'Contents', 'LimitedContents', 'Pitch', 'Posters', 'CommunityCta'];
  if (!allowed.includes(section)) throw new Error('Invalid section');

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(section);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Delete existing rows for this event
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === eventId) sheet.deleteRow(i + 1);
  }

  // Append new rows
  for (const row of rows) {
    sheet.appendRow(headers.map(h => row[h] !== undefined ? row[h] : ''));
  }

  return { section, eventId, count: rows.length };
}

// ───────────────────────────────────────────────────────────────
// GitHub ビルドトリガー
// ───────────────────────────────────────────────────────────────

function triggerGitHubBuild(triggeredBy) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('GITHUB_TOKEN');
  const owner = props.getProperty('GITHUB_OWNER') || 'cosmo-base';
  const repo = props.getProperty('GITHUB_REPO') || 'event';

  if (!token) throw new Error('GITHUB_TOKEN not configured');

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/jekyll-gh-pages.yml/dispatches`;
  const payload = JSON.stringify({ ref: 'main' });

  const response = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    payload,
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() !== 204) {
    throw new Error(`GitHub API error: ${response.getResponseCode()} ${response.getContentText()}`);
  }

  return { triggered: true, by: triggeredBy };
}

// ───────────────────────────────────────────────────────────────
// ユーティリティ
// ───────────────────────────────────────────────────────────────

function getEventRow(ss, eventId) {
  const sheet = ss.getSheetByName('Events');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const row = rows.find(r => r[0] === eventId);
  if (!row) return null;
  return rowToObject(headers, row);
}

function getSheetRowsForEvent(ss, sheetName, eventId) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const [headers, ...rows] = sheet.getDataRange().getValues();
  return rows
    .filter(r => r[0] === eventId)
    .map(r => rowToObject(headers, r));
}

function rowToObject(headers, row) {
  const obj = {};
  headers.forEach((h, i) => { obj[h] = row[i]; });
  return obj;
}
