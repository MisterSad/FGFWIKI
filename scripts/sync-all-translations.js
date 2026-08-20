import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCALES_DIR = path.resolve(__dirname, '../public/locales');

// Multi-language dictionaries for the 91 missing keys
const TRANSLATIONS = {
  de: {
    "navigation.more": "Mehr",
    "navigation.game_evolutions": "Spiel-Evolutionen",
    "seo.game_evolutions.title": "Spiel-Evolutionen & Feedback | Community Roadmap",
    "seo.game_evolutions.description": "Schlagen Sie Spielverbesserungen vor und stimmen Sie über die Community-Prioritätenliste für Foundation: Galactic Frontier ab. Regelmäßige Weiterleitung an die Entwickler.",
    "seo.game_evolutions.keywords": "Spiel-Evolutionen, Community Feedback, Roadmap, Foundation Galactic Frontier, Vorschläge",
    "tips.common.reset_data": "Zurückgesetzte / Gelöschte Daten",
    "tips.common.preserved_data": "Behaltene / Gespeicherte Daten",
    "evolutions.title": "Spiel-Evolutionen & Feedback",
    "evolutions.subtitle": "Offener Raum für Vorschläge und Community-Feedback für Foundation: Galactic Frontier. Reichen Sie Ihre Ideen ein und stimmen Sie ab: Eine regelmäßige Auswertung der gefragtesten Vorschläge wird an das Entwicklerteam weitergeleitet.",
    "evolutions.propose_btn": "Evolution vorschlagen",
    "evolutions.search_placeholder": "Vorschläge, Stichwörter oder Ideen suchen...",
    "evolutions.sort_by": "Sortieren nach",
    "evolutions.sort_votes": "🔥 Meiste Stimmen (Top-Priorität)",
    "evolutions.sort_newest": "🆕 Neueste",
    "evolutions.sort_discussed": "💬 Meistdiskutiert",
    "evolutions.sort_status": "🎯 Status",
    "evolutions.filter_all": "Alle",
    "evolutions.filter_category": "Kategorie",
    "evolutions.filter_tier": "Bedarfsstufe",
    "evolutions.categories.all": "Alle Kategorien",
    "evolutions.categories.gameplay": "Gameplay & Mechaniken",
    "evolutions.categories.qol": "Lebensqualität (QoL)",
    "evolutions.categories.balance": "Balance & Meta",
    "evolutions.categories.ships": "Flotten & Flaggschiffe",
    "evolutions.categories.heroes": "Helden & Crew",
    "evolutions.categories.economy": "Wirtschaft & Handel",
    "evolutions.categories.pvp": "PvP, GvG & SvS",
    "evolutions.categories.bugs": "Bugs & Probleme",
    "evolutions.categories.general": "Allgemein",
    "evolutions.timeline.title": "Community-Bedarfs-Zeitachse",
    "evolutions.timeline.tier_low": "Geringer Bedarf",
    "evolutions.timeline.tier_low_desc": "Aufstrebender Vorschlag (1-4 Stimmen)",
    "evolutions.timeline.tier_moderate": "Moderat",
    "evolutions.timeline.tier_moderate_desc": "Spürbares Community-Interesse (5-14 Stimmen)",
    "evolutions.timeline.tier_high": "Wichtig",
    "evolutions.timeline.tier_high_desc": "Hohe Nachfrage (15-29 Stimmen)",
    "evolutions.timeline.tier_critical": "Kritisch / Top-Priorität",
    "evolutions.timeline.tier_critical_desc": "Große Community-Erwartung (30+ Stimmen)",
    "evolutions.timeline.votes_count_one": "{{count}} Stimme",
    "evolutions.timeline.votes_count_other": "{{count}} Stimmen",
    "evolutions.timeline.vote_btn": "Ich unterstütze diese Idee",
    "evolutions.timeline.voted_btn": "Abgestimmt (+1)",
    "evolutions.timeline.login_to_vote": "Anmelden zum Abstimmen",
    "evolutions.statuses.pending": "Wartet auf Moderation",
    "evolutions.statuses.approved": "Von Community bestätigt",
    "evolutions.statuses.in_progress": "In Prüfung / In Bearbeitung",
    "evolutions.statuses.implemented": "Im Spiel integriert 🎉",
    "evolutions.statuses.rejected": "Abgelehnt",
    "evolutions.modal.create_title": "SPIEL-EVOLUTION VORSCHLAGEN",
    "evolutions.modal.title_label": "Titel / Zusammenfassung",
    "evolutions.modal.title_placeholder": "z.B. 'Alles einsammeln'-Schaltfläche für Post-Belohnungen...",
    "evolutions.modal.category_label": "Kategorie",
    "evolutions.modal.description_label": "Detaillierte Beschreibung (Problem & Lösungsvorschlag)",
    "evolutions.modal.description_placeholder": "Beschreiben Sie klar das Problem im Spiel und welche konkrete Verbesserung Sie sich wünschen...",
    "evolutions.modal.duplicate_warning": "Ähnliche Vorschläge existieren bereits – stimmen Sie stattdessen dafür ab:",
    "evolutions.modal.duplicate_empty": "Keine Duplikate gefunden. Ihre Idee scheint einzigartig zu sein!",
    "evolutions.modal.moderation_notice": "Jeder Vorschlag wird vor der Veröffentlichung geprüft, um die Relevanz der Rückmeldungen sicherzustellen.",
    "evolutions.modal.submit_btn": "Evolution einreichen",
    "evolutions.modal.submitting": "Wird gesendet...",
    "evolutions.modal.cancel": "Abbrechen",
    "evolutions.modal.login_required_title": "ANMELDUNG ERFORDERLICH",
    "evolutions.modal.login_required_desc": "Sie müssen mit einem Händlerprofil angemeldet sein, um Evolutionen vorzuschlagen und abzustimmen.",
    "evolutions.modal.sign_in_btn": "Mit Google / E-Mail anmelden",
    "evolutions.modal.success_msg": "Ihr Vorschlag wurde eingereicht! Er wird nach der Überprüfung öffentlich sichtbar sein.",
    "evolutions.admin.title": "Admin-Moderationspanel (fgfwiki)",
    "evolutions.admin.pending_badge": "{{count}} warten auf Bestätigung",
    "evolutions.admin.view_pending": "Moderationswarteschlange",
    "evolutions.admin.view_all": "Alle öffentlichen",
    "evolutions.admin.approve": "Genehmigen",
    "evolutions.admin.reject": "Ablehnen",
    "evolutions.admin.set_in_progress": "Als in Bearbeitung markieren",
    "evolutions.admin.set_implemented": "Als integriert markieren",
    "evolutions.admin.delete": "Löschen",
    "evolutions.admin.delete_confirm": "Möchten Sie diesen Diskussionsstrang wirklich löschen?",
    "evolutions.details.proposed_by": "Vorgeschlagen von",
    "evolutions.details.server": "Server",
    "evolutions.details.comments_title": "Diskussionen & Feedback",
    "evolutions.details.comment_placeholder": "Teilen Sie Ihre konstruktive Meinung...",
    "evolutions.details.post_comment": "Kommentar veröffentlichen",
    "evolutions.details.no_comments": "Noch keine Kommentare. Seien Sie der Erste!",
    "evolutions.details.delete_comment": "Löschen",
    "evolutions.details.delete_comment_confirm": "Diesen Kommentar löschen?",
    "evolutions.details.empty_results": "Keine Evolutionen gefunden.",
    "evolutions.details.empty_cta": "Schlagen Sie die erste vor!"
  },
  es: {
    "navigation.more": "Más",
    "navigation.game_evolutions": "Evoluciones del Juego",
    "seo.game_evolutions.title": "Evoluciones del Juego y Sugerencias | FGF Wiki",
    "seo.game_evolutions.description": "Propón mejoras y vota en la lista de prioridades comunitarias de Foundation: Galactic Frontier. Transmisión regular al equipo de desarrollo.",
    "seo.game_evolutions.keywords": "evoluciones del juego, sugerencias, roadmap, Foundation Galactic Frontier, feedback",
    "tips.common.reset_data": "Datos Restablecidos / Eliminados",
    "tips.common.preserved_data": "Datos Conservados / Guardados",
    "evolutions.title": "Evoluciones del Juego y Sugerencias",
    "evolutions.subtitle": "Espacio comunitario para proponer ideas y votar las prioridades de desarrollo en Foundation: Galactic Frontier. Los informes mensuales se envían directamente a los desarrolladores.",
    "evolutions.propose_btn": "Proponer una evolución",
    "evolutions.search_placeholder": "Buscar propuestas, palabras clave o ideas...",
    "evolutions.sort_by": "Ordenar por",
    "evolutions.sort_votes": "🔥 Más votados (Prioridad máxima)",
    "evolutions.sort_newest": "🆕 Más recientes",
    "evolutions.sort_discussed": "💬 Más comentados",
    "evolutions.sort_status": "🎯 Estado",
    "evolutions.filter_all": "Todos",
    "evolutions.filter_category": "Categoría",
    "evolutions.filter_tier": "Nivel de Demanda",
    "evolutions.categories.all": "Todas las categorías",
    "evolutions.categories.gameplay": "Jugabilidad y Mecánicas",
    "evolutions.categories.qol": "Calidad de Vida (QoL)",
    "evolutions.categories.balance": "Equilibrio y Meta",
    "evolutions.categories.ships": "Flotas y Naves Insignia",
    "evolutions.categories.heroes": "Héroes y Tripulación",
    "evolutions.categories.economy": "Economía y Comercio",
    "evolutions.categories.pvp": "PvP, GvG y SvS",
    "evolutions.categories.bugs": "Bugs y Errores",
    "evolutions.categories.general": "General",
    "evolutions.timeline.title": "Línea de Demanda Comunitaria",
    "evolutions.timeline.tier_low": "Baja demanda",
    "evolutions.timeline.tier_low_desc": "Propuesta emergente (1-4 votos)",
    "evolutions.timeline.tier_moderate": "Moderado",
    "evolutions.timeline.tier_moderate_desc": "Interés apreciable (5-14 votos)",
    "evolutions.timeline.tier_high": "Importante",
    "evolutions.timeline.tier_high_desc": "Gran demanda (15-29 votos)",
    "evolutions.timeline.tier_critical": "Crítico / Máxima Prioridad",
    "evolutions.timeline.tier_critical_desc": "Prioridad fundamental de la comunidad (30+ votos)",
    "evolutions.timeline.votes_count_one": "{{count}} voto",
    "evolutions.timeline.votes_count_other": "{{count}} votos",
    "evolutions.timeline.vote_btn": "Apoyo esta evolución",
    "evolutions.timeline.voted_btn": "Votado (+1)",
    "evolutions.timeline.login_to_vote": "Inicia sesión para votar",
    "evolutions.statuses.pending": "Pendiente de moderación",
    "evolutions.statuses.approved": "Aprobado por la comunidad",
    "evolutions.statuses.in_progress": "En investigación / En curso",
    "evolutions.statuses.implemented": "Implementado en el juego 🎉",
    "evolutions.statuses.rejected": "No seleccionado",
    "evolutions.modal.create_title": "PROPONER UNA EVOLUCIÓN DEL JUEGO",
    "evolutions.modal.title_label": "Título / Resumen",
    "evolutions.modal.title_placeholder": "ej. Botón de 'Recoger todo' en el correo...",
    "evolutions.modal.category_label": "Categoría",
    "evolutions.modal.description_label": "Explicación detallada (Problema y solución sugerida)",
    "evolutions.modal.description_placeholder": "Describe claramente la dificultad encontrada y la mejora concreta que te gustaría ver...",
    "evolutions.modal.duplicate_warning": "Ya existen sugerencias similares — considera apoyarlas:",
    "evolutions.modal.duplicate_empty": "No se encontraron duplicados. ¡Tu idea parece única!",
    "evolutions.modal.moderation_notice": "Cada propuesta es revisada por el equipo de moderación antes de ser publicada.",
    "evolutions.modal.submit_btn": "Enviar evolución",
    "evolutions.modal.submitting": "Enviando...",
    "evolutions.modal.cancel": "Cancelar",
    "evolutions.modal.login_required_title": "AUTENTICACIÓN REQUERIDA",
    "evolutions.modal.login_required_desc": "Debes iniciar sesión con un perfil de Trader para proponer evoluciones y votar.",
    "evolutions.modal.sign_in_btn": "Iniciar sesión con Google / Email",
    "evolutions.modal.success_msg": "¡Tu propuesta ha sido enviada! Aparecerá públicamente tras ser aprobada.",
    "evolutions.admin.title": "Panel de Moderación Admin (fgfwiki)",
    "evolutions.admin.pending_badge": "{{count}} pendientes de aprobación",
    "evolutions.admin.view_pending": "Cola de moderación",
    "evolutions.admin.view_all": "Todos los públicos",
    "evolutions.admin.approve": "Aprobar",
    "evolutions.admin.reject": "Rechazar",
    "evolutions.admin.set_in_progress": "Marcar En Curso",
    "evolutions.admin.set_implemented": "Marcar Implementado",
    "evolutions.admin.delete": "Eliminar",
    "evolutions.admin.delete_confirm": "¿Seguro que deseas eliminar este hilo de evolución?",
    "evolutions.details.proposed_by": "Propuesto por",
    "evolutions.details.server": "Servidor",
    "evolutions.details.comments_title": "Debates y Opiniones",
    "evolutions.details.comment_placeholder": "Comparte tu opinión constructiva...",
    "evolutions.details.post_comment": "Publicar comentario",
    "evolutions.details.no_comments": "Aún no hay comentarios. ¡Sé el primero en opinar!",
    "evolutions.details.delete_comment": "Eliminar",
    "evolutions.details.delete_comment_confirm": "¿Eliminar este comentario?",
    "evolutions.details.empty_results": "No se encontraron evoluciones con estos filtros.",
    "evolutions.details.empty_cta": "¡Sé el primero en proponer una!"
  }
};

// Generic translator fallback that populates missing keys based on English and French context
const enData = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en/translation.json'), 'utf8'));

// Helper to set nested property safely
function setNested(obj, pathStr, val) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!curr[parts[i]]) curr[parts[i]] = {};
    curr = curr[parts[i]];
  }
  curr[parts[parts.length - 1]] = val;
}

function getNested(obj, pathStr) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (const p of parts) {
    if (!curr || typeof curr !== 'object') return undefined;
    curr = curr[p];
  }
  return curr;
}

function getFlatKeys(obj, prefix = "") {
  let keys = {};
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      Object.assign(keys, getFlatKeys(v, fullKey));
    } else {
      keys[fullKey] = v;
    }
  }
  return keys;
}

// Add navigation.more to en and fr first
setNested(enData, 'navigation.more', 'More');
fs.writeFileSync(path.join(LOCALES_DIR, 'en/translation.json'), JSON.stringify(enData, null, 4), 'utf8');

const frData = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'fr/translation.json'), 'utf8'));
setNested(frData, 'navigation.more', 'Plus');
fs.writeFileSync(path.join(LOCALES_DIR, 'fr/translation.json'), JSON.stringify(frData, null, 4), 'utf8');

const enFlat = getFlatKeys(enData);
const targetLangs = fs.readdirSync(LOCALES_DIR).filter(f => fs.statSync(path.join(LOCALES_DIR, f)).isDirectory());

// Language specific more labels
const MORE_LABELS = {
  ar: "المزيد",
  de: "Mehr",
  es: "Más",
  fi: "Lisää",
  id: "Lainnya",
  it: "Altro",
  ja: "その他",
  ko: "더보기",
  ms: "Lagi",
  nb: "Mer",
  nl: "Meer",
  pl: "Więcej",
  pt: "Mais",
  ru: "Еще",
  sv: "Mer",
  th: "เพิ่มเติม",
  tr: "Daha Fazla",
  uk: "Більше",
  vi: "Thêm",
  zh: "更多",
  "zh-tw": "更多"
};

targetLangs.forEach(lang => {
  if (lang === 'en' || lang === 'fr') return;
  const filePath = path.join(LOCALES_DIR, lang, 'translation.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const dict = TRANSLATIONS[lang] || {};

  // Inject more label
  setNested(data, 'navigation.more', MORE_LABELS[lang] || 'More');

  // Fill in every key present in EN
  for (const [key, enVal] of Object.entries(enFlat)) {
    const existing = getNested(data, key);
    if (existing === undefined) {
      const translated = dict[key] || enVal;
      setNested(data, key, translated);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
  console.log(`Synced ${lang} successfully.`);
});

console.log('All 23 languages synchronized!');
