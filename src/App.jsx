import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DESIGN SYSTEM ────────────────────────────────────────────────────────────
const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    :root {
      --bg:           #060810;
      --surface:      #0c1018;
      --card:         #0f1623;
      --card-hover:   #141d2e;
      --border:       rgba(148, 163, 184, 0.08);
      --border-hi:    rgba(56, 189, 248, 0.22);
      --text:         #e2e8f0;
      --muted:        #8896a5;
      --accent:       #38bdf8;
      --accent2:      #34d399;
      --accent3:      #a78bfa;
      --gold:         #f59e0b;
      --red:          #f87171;
      --glow-a:       rgba(56,189,248,0.18);
      --glow-b:       rgba(52,211,153,0.12);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      background:
        radial-gradient(ellipse 90% 60% at 15% -5%, rgba(56,189,248,0.055) 0%, transparent 55%),
        radial-gradient(ellipse 70% 50% at 85% 95%, rgba(52,211,153,0.04) 0%, transparent 55%),
        var(--bg);
      color: var(--text);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.65;
      overflow-x: hidden;
    }

    a { color: var(--accent); text-decoration: none; transition: color 0.2s; }
    a:hover { color: var(--accent2); }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.25); border-radius: 3px; }

    /* ── NAVBAR ─────────────────────────────────────────── */
    .nav {
      position: sticky; top: 0; z-index: 999;
      background: rgba(6,8,16,0.88);
      backdrop-filter: blur(24px) saturate(160%);
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      max-width: 1240px; margin: 0 auto; padding: 0 32px;
      height: 62px; display: flex; align-items: center; justify-content: space-between;
    }
    .nav-brand {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem; font-weight: 700;
      display: flex; align-items: center; gap: 6px;
    }
    .nav-brand-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent2); display: inline-block; animation: pulse-dot 2.5s ease-in-out infinite; }
    .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
    .nav-links a { color: var(--muted); font-size: 0.82rem; font-weight: 500; padding: 5px 11px; border-radius: 7px; transition: all 0.18s; }
    .nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.055); }
    .nav-cv {
      background: linear-gradient(135deg, rgba(56,189,248,0.14), rgba(52,211,153,0.1)) !important;
      border: 1px solid rgba(56,189,248,0.28) !important;
      color: var(--accent) !important; font-weight: 600 !important;
    }
    .nav-cv:hover { box-shadow: 0 0 18px rgba(56,189,248,0.2); transform: translateY(-1px); }

    /* ── LAYOUT ─────────────────────────────────────────── */
    .w { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
    section { padding: 88px 0; }

    .sec-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--accent2); margin-bottom: 10px; display: block;
    }
    .sec-title {
      font-size: clamp(1.65rem, 3vw, 2.2rem); font-weight: 800;
      letter-spacing: -0.025em; color: var(--text); margin-bottom: 6px;
    }
    .sec-sub { color: var(--muted); font-size: 0.95rem; margin-bottom: 52px; }

    /* ── CARD ───────────────────────────────────────────── */
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 18px; padding: 28px;
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }
    .card:hover { border-color: var(--border-hi); box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 24px rgba(56,189,248,0.06); transform: translateY(-3px); }
    .card-blue  { border-left: 3px solid var(--accent); }
    .card-green { border-left: 3px solid var(--accent2); }
    .card-violet{ border-left: 3px solid var(--accent3); }
    .card-gold  { border-left: 3px solid var(--gold); }

    /* ── BADGE ──────────────────────────────────────────── */
    .badge {
      display: inline-flex; align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; font-weight: 600;
      padding: 3px 9px; border-radius: 5px;
      background: rgba(56,189,248,0.07); border: 1px solid rgba(56,189,248,0.18);
      color: #7dd3fc; white-space: nowrap;
    }
    .badge-g { background: rgba(52,211,153,0.07); border-color: rgba(52,211,153,0.18); color: #6ee7b7; }
    .badge-v { background: rgba(167,139,250,0.07); border-color: rgba(167,139,250,0.18); color: #c4b5fd; }
    .badge-gold { background: rgba(245,158,11,0.07); border-color: rgba(245,158,11,0.22); color: #fde68a; }
    .badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }

    /* ── BUTTONS ────────────────────────────────────────── */
    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 10px 20px; border-radius: 10px;
      font-size: 0.875rem; font-weight: 600; cursor: pointer;
      transition: all 0.22s; border: none; text-decoration: none;
    }
    .btn-p {
      background: linear-gradient(135deg, rgba(56,189,248,0.16), rgba(52,211,153,0.1));
      border: 1px solid rgba(56,189,248,0.35); color: var(--accent);
    }
    .btn-p:hover { background: linear-gradient(135deg, rgba(56,189,248,0.26), rgba(52,211,153,0.18)); box-shadow: 0 0 22px rgba(56,189,248,0.22); transform: translateY(-2px); color: var(--accent); }
    .btn-s {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--muted);
    }
    .btn-s:hover { background: rgba(255,255,255,0.08); border-color: rgba(148,163,184,0.22); color: var(--text); }
    .btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 34px; }

    /* ── HERO ───────────────────────────────────────────── */
    .hero {
      padding: 128px 0 88px; position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(circle 700px at 70% 30%, rgba(56,189,248,0.035) 0%, transparent 70%),
        radial-gradient(circle 400px at 10% 80%, rgba(167,139,250,0.025) 0%, transparent 60%);
    }
    /* Subtle grid texture */
    .hero::after {
      content: '';
      position: absolute; inset: 0; pointer-events: none; opacity: 0.018;
      background-image:
        linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 80%);
    }
    .hero-avail {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 7px 18px; border-radius: 999px;
      background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.22);
      font-size: 0.8rem; font-weight: 700; color: var(--accent2);
      margin-bottom: 28px; letter-spacing: 0.01em;
    }
    .hero-avail .dot {
      width: 7px; height: 7px; border-radius: 50%; background: var(--accent2);
      animation: pulse-dot 2s ease-in-out infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
      50% { box-shadow: 0 0 0 5px rgba(52,211,153,0); }
    }
    .hero h1 {
      font-size: clamp(2.8rem, 6.5vw, 4.6rem); font-weight: 800;
      letter-spacing: -0.035em; line-height: 1.08; margin-bottom: 20px;
      background: linear-gradient(140deg, #e2e8f0 20%, rgba(56,189,248,0.92) 60%, rgba(52,211,153,0.85) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-role { font-size: 1.15rem; font-weight: 600; color: var(--accent); margin-bottom: 10px; }
    .hero-edu {
      display: flex; flex-direction: column; gap: 5px;
      margin-bottom: 4px;
    }
    .hero-edu-row {
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      font-size: 0.9rem; color: var(--muted);
    }
    .hero-edu-row strong { color: var(--text); font-weight: 600; }
    .hero-edu-row .sep { color: rgba(148,163,184,0.25); }
    .hero-target {
      display: inline-flex; align-items: center; gap: 8px;
      margin-top: 18px;
      padding: 9px 18px; border-radius: 10px;
      background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.18);
      font-size: 0.82rem; font-weight: 600; color: #c4b5fd;
    }

    /* ── STATS BAR ──────────────────────────────────────── */
    .stats-bar { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.018); padding: 0; }
    .stats-grid {
      display: grid; grid-template-columns: repeat(5, 1fr);
    }
    .stat-item { padding: 28px 16px; text-align: center; border-right: 1px solid var(--border); }
    .stat-item:last-child { border-right: none; }
    .stat-val {
      font-size: 1.55rem; font-weight: 800; letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .stat-lbl { font-size: 0.78rem; font-weight: 700; color: var(--text); margin-top: 4px; }
    .stat-sub { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }

    /* ── EDUCATION ──────────────────────────────────────── */
    .edu-card {
      position: relative; overflow: hidden;
      background: var(--card); border: 1px solid var(--border);
      border-radius: 20px; padding: 34px;
      transition: all 0.28s;
    }
    .edu-card:hover { border-color: var(--border-hi); box-shadow: 0 12px 50px rgba(0,0,0,0.3); transform: translateY(-4px); }
    .edu-blob {
      position: absolute; top: -80px; right: -80px;
      width: 240px; height: 240px; border-radius: 50%;
      opacity: 0.055; pointer-events: none;
    }
    .edu-status {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 14px; border-radius: 999px;
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
      margin-bottom: 22px;
    }
    .edu-status-incoming { background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.22); color: var(--accent); }
    .edu-status-graduated { background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.22); color: var(--accent2); }
    .edu-inst { font-size: 1.28rem; font-weight: 800; color: var(--text); margin-bottom: 4px; }
    .edu-deg { font-size: 1rem; font-weight: 600; color: var(--accent); margin-bottom: 6px; }
    .edu-meta { font-size: 0.82rem; color: var(--muted); display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 18px; }
    .edu-honors {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 10px;
      background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.22);
      font-size: 0.82rem; font-weight: 800; color: #fde68a;
      margin-bottom: 18px;
    }
    .edu-awards { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .edu-awards li {
      display: flex; align-items: flex-start; gap: 9px;
      font-size: 0.83rem; color: var(--muted); line-height: 1.45;
    }
    .edu-awards li::before { content: '→'; color: var(--accent2); flex-shrink: 0; font-size: 0.78rem; margin-top: 1px; }
    .edu-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .edu-highlights li {
      display: flex; gap: 10px;
      font-size: 0.875rem; color: var(--muted); line-height: 1.5;
    }
    .edu-highlights li::before { content: '◆'; color: var(--accent); flex-shrink: 0; font-size: 0.5rem; margin-top: 7px; }

    /* ── EXPERIENCE / TIMELINE ──────────────────────────── */
    .timeline { position: relative; padding-left: 0; }
    .timeline-track {
      position: absolute; left: 20px; top: 14px; bottom: 14px; width: 1px;
      background: linear-gradient(to bottom, var(--accent), transparent);
      opacity: 0.22;
    }
    .tl-item { position: relative; padding-left: 60px; margin-bottom: 44px; }
    .tl-item:last-child { margin-bottom: 0; }
    .tl-dot {
      position: absolute; left: 12px; top: 8px;
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--card); border: 2px solid var(--accent);
      box-shadow: 0 0 0 4px rgba(56,189,248,0.08);
    }
    .tl-period {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem; font-weight: 600; color: var(--accent2);
      margin-bottom: 6px; display: flex; align-items: center; gap: 10px;
    }
    .tl-type {
      padding: 2px 8px; border-radius: 5px;
      background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.18);
      font-size: 0.65rem; color: var(--accent2); font-weight: 700; letter-spacing: 0.04em;
    }
    .tl-role { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .tl-company { font-size: 0.9rem; font-weight: 600; color: var(--accent); margin-bottom: 14px; }
    .tl-bullets { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .tl-bullets li {
      display: flex; gap: 10px;
      font-size: 0.875rem; color: var(--muted); line-height: 1.5;
    }
    .tl-bullets li::before { content: '▸'; color: var(--accent2); flex-shrink: 0; font-size: 0.72rem; margin-top: 3px; }

    /* ── RESEARCH ───────────────────────────────────────── */
    .research-hero {
      background: linear-gradient(135deg, rgba(56,189,248,0.04), rgba(52,211,153,0.025));
      border: 1px solid rgba(56,189,248,0.14); border-radius: 22px; padding: 40px;
    }
    .research-accepted { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
    .accepted-pill {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 15px; border-radius: 999px;
      background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.2);
      font-size: 0.77rem; font-weight: 700; color: var(--accent2);
    }
    .accepted-pill::before { content: '✓'; }
    .research-title { font-size: 1.2rem; font-weight: 800; color: var(--text); margin-bottom: 6px; }
    .research-super { font-size: 0.85rem; color: var(--muted); margin-bottom: 22px; font-style: italic; }
    .research-bullets { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 0 0 20px; }
    .research-bullets li {
      display: flex; gap: 12px;
      font-size: 0.875rem; color: var(--muted); line-height: 1.6;
      padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .research-bullets li:last-child { border-bottom: none; padding-bottom: 0; }
    .research-bullets li::before { content: '◆'; color: var(--accent); flex-shrink: 0; font-size: 0.55rem; margin-top: 7px; }

    /* ── PROJECTS ───────────────────────────────────────── */
    .proj-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 18px; overflow: hidden; transition: all 0.28s;
      display: flex; flex-direction: column;
    }
    .proj-card:hover { border-color: var(--border-hi); transform: translateY(-5px); box-shadow: 0 14px 50px rgba(0,0,0,0.35), 0 0 24px rgba(56,189,248,0.07); }
    .proj-media {
      width: 100%; height: 210px; background: #080c16;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0; position: relative;
      border-bottom: 1px solid var(--border);
    }
    .proj-media img { width: 100%; height: 100%; object-fit: cover; }
    .proj-media video { width: 100%; height: 100%; object-fit: cover; }
    .proj-no-media {
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      color: var(--muted); font-size: 0.8rem; text-align: center; padding: 20px;
    }
    .proj-no-media .proj-icon { font-size: 2rem; opacity: 0.4; }
    .proj-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
    .proj-title { font-size: 1rem; font-weight: 800; color: var(--text); margin-bottom: 3px; }
    .proj-sub { font-size: 0.78rem; font-weight: 600; color: var(--accent); font-family: 'JetBrains Mono', monospace; margin-bottom: 14px; letter-spacing: 0.02em; text-transform: uppercase; }
    .proj-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; flex: 1; margin-bottom: 14px; }
    .proj-bullets li { display: flex; gap: 8px; font-size: 0.82rem; color: var(--muted); line-height: 1.5; }
    .proj-bullets li::before { content: '•'; color: var(--accent2); flex-shrink: 0; }
    .proj-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border); }

    /* ── SKILLS ─────────────────────────────────────────── */
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
    .skill-cat { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 14px; }

    /* ── LEADERSHIP ─────────────────────────────────────── */
    .ldr-item {
      display: flex; gap: 22px; padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }
    .ldr-item:last-child { border-bottom: none; padding-bottom: 0; }
    .ldr-period { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--accent2); font-weight: 600; min-width: 130px; padding-top: 2px; flex-shrink: 0; }
    .ldr-role { font-size: 0.95rem; font-weight: 700; color: var(--text); }
    .ldr-org { font-size: 0.83rem; color: var(--accent); font-weight: 600; margin-bottom: 4px; }
    .ldr-detail { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }

    /* ── AWARDS ─────────────────────────────────────────── */
    .awards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
    .award-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px 18px; border-radius: 12px;
      background: rgba(255,255,255,0.02); border: 1px solid var(--border);
      transition: all 0.2s;
    }
    .award-item:hover { background: rgba(255,255,255,0.04); border-color: rgba(148,163,184,0.16); }
    .award-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
    .award-name { font-size: 0.88rem; font-weight: 700; color: var(--text); }
    .award-desc { font-size: 0.77rem; color: var(--muted); margin-top: 2px; line-height: 1.4; }

    /* ── CHART ──────────────────────────────────────────── */
    .chart-wrap {
      background: rgba(0,0,0,0.28); border: 1px solid var(--border);
      border-radius: 16px; padding: 26px;
    }
    .chart-title { font-size: 0.9rem; font-weight: 700; color: var(--accent); margin-bottom: 5px; }
    .chart-hint { font-size: 0.75rem; color: var(--muted); margin-bottom: 18px; }
    .chart-hint span { color: var(--accent2); font-weight: 600; }

    /* ── PAPERS ─────────────────────────────────────────── */
    .paper-item {
      display: flex; gap: 20px; align-items: flex-start; padding: 20px;
      border-radius: 14px; border: 1px solid var(--border);
      background: rgba(255,255,255,0.02); transition: all 0.22s;
    }
    .paper-item:hover { border-color: var(--border-hi); background: rgba(255,255,255,0.03); }
    .paper-num { font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; font-weight: 700; color: rgba(56,189,248,0.18); flex-shrink: 0; min-width: 36px; }
    .paper-title { font-size: 0.93rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
    .paper-notes { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
    .paper-link { display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--accent); font-weight: 700; margin-top: 9px; }
    .paper-link:hover { color: var(--accent2); }

    /* ── FEED ───────────────────────────────────────────── */
    .feed-card {
      border-radius: 14px; overflow: hidden;
      background: rgba(255,255,255,0.02); border: 1px solid var(--border);
      transition: all 0.28s; text-decoration: none; color: inherit; display: block;
    }
    .feed-card:hover { border-color: var(--border-hi); transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
    .feed-card img { width: 100%; height: 220px; object-fit: cover; display: block; }
    .feed-body { padding: 18px; }
    .feed-title { font-size: 0.93rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
    .feed-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
    .feed-cta { font-size: 0.78rem; color: var(--accent); font-weight: 700; display: inline-block; margin-top: 10px; }

    /* ── CONTACT ────────────────────────────────────────── */
    .contact-cta {
      background: linear-gradient(140deg, rgba(56,189,248,0.05) 0%, rgba(52,211,153,0.03) 50%, rgba(167,139,250,0.03) 100%);
      border: 1px solid rgba(56,189,248,0.13); border-radius: 26px;
      padding: 70px 56px; text-align: center; position: relative; overflow: hidden;
    }
    .contact-cta::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle 400px at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%);
    }
    .contact-cta h2 {
      font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 14px;
    }
    .contact-cta p { color: var(--muted); max-width: 520px; margin: 0 auto 36px; font-size: 0.95rem; line-height: 1.65; }
    .contact-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
    .docs-row { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
    .doc-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 8px;
      font-size: 0.8rem; font-weight: 600;
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      color: var(--muted); transition: all 0.2s;
    }
    .doc-link:hover { border-color: rgba(56,189,248,0.28); color: var(--accent); background: rgba(56,189,248,0.05); }

    /* ── FOOTER ─────────────────────────────────────────── */
    .footer { border-top: 1px solid var(--border); padding: 44px 0; text-align: center; }
    .footer-brand { font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; color: var(--accent2); font-weight: 600; margin-bottom: 8px; }
    .footer-copy { font-size: 0.78rem; color: var(--muted); }

    /* ── ACCORDION ──────────────────────────────────────── */
    .acc-btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 8px 18px; border-radius: 10px; cursor: pointer;
      background: rgba(52,211,153,0.06); border: 1px solid rgba(52,211,153,0.2);
      color: var(--accent2); font-size: 0.85rem; font-weight: 700;
      margin-top: 16px; transition: all 0.22s;
    }
    .acc-btn:hover { background: rgba(52,211,153,0.1); box-shadow: 0 0 18px rgba(52,211,153,0.15); }
    .acc-content {
      margin-top: 16px; white-space: pre-wrap; overflow: hidden;
      color: var(--muted); background: rgba(0,0,0,0.28);
      border: 1px solid var(--border); padding: 20px;
      border-radius: 13px; font-size: 0.85rem; line-height: 1.75;
    }

    /* ── DIVIDER ────────────────────────────────────────── */
    .hr { height: 1px; background: var(--border); border: none; }

    /* ── RESPONSIVE ─────────────────────────────────────── */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    @media (max-width: 1024px) { .grid-3 { grid-template-columns: 1fr 1fr; } .stats-grid { grid-template-columns: repeat(3, 1fr); } .stat-item:nth-child(3) { border-right: none; } }
    @media (max-width: 768px) {
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
      .ldr-item { flex-direction: column; gap: 8px; }
      .ldr-period { min-width: auto; }
      .contact-cta { padding: 44px 24px; }
      .research-hero { padding: 26px; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stat-item:nth-child(5) { grid-column: 1 / -1; border-right: none; }
    }
    @media (max-width: 860px) { .nav-links { display: none; } }
    @media (max-width: 520px) {
      .w { padding: 0 20px; }
      .hero { padding: 88px 0 64px; }
      section { padding: 64px 0; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SEMESTER_COURSES = {
  "Fall 2022": [
    ["ENG 111", "First-Year Composition & Rhetoric", "A"],
    ["ORI 100", "First-Year Experience Seminar", "A"],
    ["PSY 281", "Intro to Psychology", "A"],
    ["POS 201", "American Government", "A"],
    ["MUA 123", "Applied Music: Classical Guitar", "A"],
  ],
  "Spring 2023": [
    ["ENG 112", "Techniques of Research", "A"],
    ["SPE 101", "Fundamentals of Speech", "A"],
    ["CS 180", "Intro to Digital Literacy", "A"],
    ["MAT 109", "Precalculus I", "A"],
  ],
  "Fall 2023": [
    ["BUS 181", "Intro to Business", "A"],
    ["CS 231", "Computer Science I", "A"],
    ["CS 332", "Computer Hardware Organization", "A"],
    ["PHI 220", "Intro to Philosophy", "A"],
    ["ISR 165", "Tennis", "A"],
  ],
  "Spring 2024": [
    ["CS 232", "Computer Science II", "A"],
    ["CS 306", "DB & Logic Design", "A"],
    ["CS 340", "Programming for the Web", "A"],
    ["MAT 211", "Calculus I", "B+"],
    ["CS 317", "Ethics & Digital Technology", "A"],
  ],
  "Fall 2024": [
    ["CS 331", "Data Structures & Algorithms", "A"],
    ["CS 440", "Data Communications", "A"],
    ["PHY 201", "General College Physics I", "A"],
    ["SOC 200", "Society & Social Justice", "A"],
    ["THE 201", "Theology: Faith & Beliefs", "A"],
  ],
  "Spring 2025": [
    ["CS 318", "Biometrics", "A"],
    ["CS 474", "Computer Forensics", "A"],
    ["CS 477", "Computer Security", "A"],
    ["MAT 253", "Discrete Math II", "A"],
    ["HIS 150", "Meaning of History", "A"],
  ],
};

const RESEARCH_STATEMENT = `Research Statement — A Hybrid AI Framework for Predictive Cybersecurity
Integrating Deep Learning, Behavioral Modeling, and Probabilistic Inference

1. Abstract
Modern cybersecurity systems remain largely reactive, identifying intrusions after they have occurred.
As attack vectors evolve and user behaviors become more dynamic, traditional rule-based and even
static machine learning approaches fail to adapt. This research proposes a hybrid AI framework that
integrates deep learning, behavioral modeling, and probabilistic inference to achieve proactive cyber
threat prediction. By leveraging contextual user and network behavior, the framework aims to detect
anomalies indicative of emerging threats before compromise occurs. The ultimate goal is to design an
interpretable, adaptable, and deployable model that supports human analysts in real-time security
decision-making.

2. Background and Motivation
My research trajectory originates from my dual foundation in Computer Science and Cybersecurity,
reinforced through hands-on projects in secure software engineering and digital forensics. These
experiences cultivated a persistent question: can AI anticipate attacks before they unfold?

To answer that, I began studying predictive modeling through my independent research on financial
time-series forecasting. The project explores the predictive capacity of hybrid architectures
(MLP, CNN-LSTM) in capturing temporal and behavioral patterns within volatile data. The core
principle connecting finance and cybersecurity is behavioral pattern recognition — markets
fluctuate like network environments, driven by anomalies, noise, and subtle signals.

3. Research Objectives
  • Develop a predictive AI model that dynamically learns from network/user behavior to identify attack precursors.
  • Integrate probabilistic reasoning with deep neural architectures to quantify uncertainty in threat predictions.
  • Design an Explainable AI (XAI) interface for interpretable model decision-making.

4. Proposed Methodology
  • Data: UNSW-NB15, CICIDS2017, TON_IoT datasets.
  • Architecture: CNN-LSTM backbone → Bayesian/Gaussian uncertainty layers → SHAP/LIME explainability module.
  • Evaluation: Precision, Recall, F1, ROC-AUC; simulated SIEM environment for real-time testing.

5. Expected Outcomes
  1. A validated, explainable deep learning model for predictive cybersecurity threat detection.
  2. Publication target: IEEE Transactions on Information Forensics and Security or Computers & Security.
  3. A modular system ready for deployment within academic and industrial SOC environments.`;

// ─── UTILITY ──────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, variant = "" }) => (
  <span className={`badge${variant ? " badge-" + variant : ""}`}>{children}</span>
);

const Accordion = ({ text, label = "Expand Full Statement" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="acc-btn" onClick={() => setOpen(s => !s)}>
        {open ? "▲ Collapse" : `▼ ${label}`}
      </button>
      <AnimatePresence>
        {open && (
          <motion.pre
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="acc-content"
          >
            {text}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

const Navbar = () => (
  <nav className="nav">
    <div className="nav-inner">
      <div className="nav-brand">
        <span className="nav-brand-dot" />
        <span style={{ color: "var(--accent2)" }}>Aftab</span>
        <span style={{ color: "var(--accent)" }}>.</span>
        <span style={{ color: "var(--muted)" }}>dev</span>
      </div>
      <ul className="nav-links">
        {[
          ["#education", "Education"],
          ["#experience", "Experience"],
          ["#research", "Research"],
          ["#projects", "Projects"],
          ["#skills", "Skills"],
          ["#leadership", "Leadership"],
          ["#courses", "Academic Record"],
          ["#contact", "Contact"],
        ].map(([href, label]) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
        <li>
          <a href="/files/AftabAlamMasjidi_CV.pdf" target="_blank" rel="noopener noreferrer" className="nav-cv">
            ↓ CV
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const Hero = () => {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const name = "Aftab Alam Masjidi";
    let i = 0;
    const t = setInterval(() => {
      setTyped(name.slice(0, i++));
      if (i > name.length) clearInterval(t);
    }, 72);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero">
      <div className="w">
        <FadeIn delay={0.05}>
          <div className="hero-avail">
            <span className="dot" />
            Open to Cybersecurity Roles in Europe — Student Assistantships & Full-Time
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <h1 style={{ minHeight: "1.1em" }}>{typed || " "}</h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="hero-role">Cybersecurity Engineer &amp; AI Researcher</div>
          <div className="hero-edu" style={{ marginTop: 10 }}>
            <div className="hero-edu-row">
              <strong>B.S. Computer Science</strong>
              <span className="sep">|</span>
              <span>Barry University, Miami</span>
              <span className="sep">|</span>
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>Summa Cum Laude · GPA 4.0</span>
              <span className="sep">|</span>
              <span>Graduating May 2026</span>
            </div>
            <div className="hero-edu-row">
              <strong>M.Sc. Cybersecurity</strong>
              <span className="sep">|</span>
              <span>Aalborg University Copenhagen, Denmark</span>
              <span className="sep">|</span>
              <span style={{ color: "var(--accent2)", fontWeight: 600 }}>Incoming · 2026–2028</span>
            </div>
          </div>
          <div className="hero-target">
            <span style={{ color: "var(--accent3)" }}>🎯</span>
            Targeting cybersecurity roles in Europe (Denmark &amp; broader EU) — student assistantships and full-time positions from September 2026
          </div>
        </FadeIn>

        <FadeIn delay={0.28}>
          <div className="btn-row">
            <a className="btn btn-p" href="/files/AftabAlamMasjidi_CV.pdf" target="_blank" rel="noopener noreferrer">
              ↓ Download CV
            </a>
            <a className="btn btn-p" href="https://www.linkedin.com/in/aftabalammasjidi" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn-s" href="https://github.com/aftabalam01-creator" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn btn-s" href="mailto:aftabalam.masjidi@mymail.barry.edu">
              Email
            </a>
            <a className="btn btn-s" href="#research">
              View Research ↓
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const StatsBar = () => (
  <div className="stats-bar">
    <div className="w">
      <div className="stats-grid">
        {[
          { val: "4.0 / 4.0", lbl: "GPA", sub: "Perfect Academic Record" },
          { val: "Summa Cum Laude", lbl: "Graduation Honors", sub: "Highest Distinction" },
          { val: "Stamps Scholar", lbl: "Merit Scholarship", sub: "Top 0.5% · Full Ride" },
          { val: "5 ×", lbl: "President's List", sub: "Exceptional Academics" },
          { val: "2026–2028", lbl: "MSc Cybersecurity", sub: "Aalborg Univ. Copenhagen" },
        ].map(({ val, lbl, sub }) => (
          <div className="stat-item" key={lbl}>
            <div className="stat-val">{val}</div>
            <div className="stat-lbl">{lbl}</div>
            <div className="stat-sub">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Education = () => (
  <section id="education">
    <div className="w">
      <FadeIn>
        <span className="sec-label">Education</span>
        <h2 className="sec-title">Academic Foundation</h2>
        <p className="sec-sub">A rigorous dual-track in Computer Science and Cybersecurity, bridging the US and European academic systems.</p>
      </FadeIn>
      <div className="grid-2">
        <FadeIn delay={0.08}>
          <div className="edu-card">
            <div className="edu-blob" style={{ background: "var(--accent)" }} />
            <div className="edu-status edu-status-incoming">
              <span className="dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              Incoming · September 2026
            </div>
            <div className="edu-inst">Aalborg University Copenhagen</div>
            <div className="edu-deg">M.Sc. Cybersecurity</div>
            <div className="edu-meta">
              <span>📍 Copenhagen, Denmark</span>
              <span>🗓 2026 – 2028</span>
            </div>
            <ul className="edu-highlights">
              {[
                "Research-intensive program aligned with EU cybersecurity frameworks and GDPR",
                "Focus areas: Network Security, Cryptography, AI-driven Threat Detection",
                "Strong industry links across Scandinavia and the broader European tech sector",
                "Positioned to pursue student assistantship roles during studies",
              ].map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="edu-card">
            <div className="edu-blob" style={{ background: "var(--accent2)" }} />
            <div className="edu-status edu-status-graduated">
              ✓ Graduated May 2026
            </div>
            <div className="edu-inst">Barry University</div>
            <div className="edu-deg">B.S. Computer Science · Specialization: Cybersecurity</div>
            <div className="edu-meta">
              <span>📍 Miami, FL, USA</span>
              <span>🗓 2022 – 2026</span>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>GPA 4.0 / 4.0</span>
            </div>
            <div className="edu-honors">
              🏅 Summa Cum Laude — Highest Academic Distinction
            </div>
            <ul className="edu-awards">
              {[
                "Stamps Scholar — Full-ride merit scholarship, top 0.5% of applicants",
                "President's List — 5 consecutive semesters",
                "Dean's List 2024",
                "Outstanding Performance Award 2024",
                "Accepted: CURO Symposium 2026 (UGA) & Barry STEM Symposium 2026",
              ].map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" style={{ paddingTop: 0 }}>
    <div className="w">
      <FadeIn>
        <span className="sec-label">Professional Experience</span>
        <h2 className="sec-title">Work History</h2>
        <p className="sec-sub">Hands-on engineering and research coordination combining AI, software development, and cybersecurity.</p>
      </FadeIn>
      <div className="card">
        <div className="timeline" style={{ position: "relative" }}>
          <div className="timeline-track" />
          {[
            {
              period: "Sept 2025 – Present",
              type: "Part-Time",
              role: "AI Center & DX Lab Coordinator",
              company: "Barry University",
              bullets: [
                "Manage daily operations of university AI, robotics, and emerging technology labs",
                "Assist faculty and students in deploying ML tools, XR environments, and optimizing hardware/software workflows",
                "Lead live demonstrations and onboard students onto AI frameworks including PyTorch and TensorFlow",
                "Coordinate project logistics across interdisciplinary teams working in machine learning and extended reality",
              ],
            },
            {
              period: "May – Aug 2024",
              type: "Remote Internship",
              role: "Software Engineer Intern",
              company: "BeStudios",
              bullets: [
                "Built and optimized Java-based backend modules for client-facing applications",
                "Improved runtime performance and system scalability by 25% through targeted refactoring",
                "Collaborated with cross-functional teams to design, test, and deliver production-ready features",
                "Participated in agile sprints, code reviews, and client requirement analysis sessions",
              ],
            },
          ].map((item, i) => (
            <FadeIn key={item.role} delay={i * 0.1}>
              <div className="tl-item">
                <div className="tl-dot" />
                <div className="tl-period">
                  {item.period}
                  <span className="tl-type">{item.type}</span>
                </div>
                <div className="tl-role">{item.role}</div>
                <div className="tl-company">{item.company}</div>
                <ul className="tl-bullets">
                  {item.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Research = () => (
  <section id="research">
    <div className="w">
      <FadeIn>
        <span className="sec-label">Research</span>
        <h2 className="sec-title">Academic Research</h2>
        <p className="sec-sub">Undergraduate research accepted at competitive national symposia, with direct applications to cybersecurity and adaptive defense systems.</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="research-hero">
          <div className="research-accepted">
            {["CURO Symposium 2026 — University of Georgia", "Barry STEM Symposium 2026"].map(a => (
              <span className="accepted-pill" key={a}>{a}</span>
            ))}
          </div>
          <div className="research-title">
            Multi-Model Framework for Forecasting &amp; Clustering Financial Assets
          </div>
          <div className="research-super">
            Supervised by Prof. James Haralambides · Barry University · 2024 – 2026
          </div>
          <ul className="research-bullets">
            {[
              "Designed and implemented a unified ML framework comparing classical and deep learning models (Ridge Regression, Random Forest, MLP, CNN, LSTM) across multi-asset financial time-series datasets.",
              "Conducted rolling-window and out-of-sample experiments to evaluate model stability under distribution shift in non-stationary environments.",
              "Classical models frequently generalized more reliably than deep neural architectures during regime changes — findings directly transferable to cybersecurity anomaly detection under behavioral drift.",
              "Applied unsupervised learning methods (PCA, NMF, t-SNE) to analyze structural clustering across asset classes.",
              "Extracted insights relevant to adaptive security systems: the framework's drift-aware evaluation methodology maps directly onto network intrusion detection under evolving threat landscapes.",
            ].map(b => <li key={b.slice(0, 40)}>{b}</li>)}
          </ul>
          <div className="badges">
            {["Python", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "LSTM", "CNN", "PCA", "t-SNE"].map(t => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <a className="btn btn-s" style={{ fontSize: "0.82rem" }} href="https://github.com/aftabalam01-creator/Stock-Forecasting-ML-AftabAlamMasjidi" target="_blank" rel="noopener noreferrer">
              Open Repository ↗
            </a>
          </div>
          <Accordion text={RESEARCH_STATEMENT} label="View Full Research Statement" />
        </div>
      </FadeIn>

      <FadeIn delay={0.18}>
        <div style={{ marginTop: 24 }} className="card card-violet">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>Next Phase: Hybrid AI for Cyber Threat Prediction</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: 14 }}>
            Building on financial time-series research, the next phase applies temporal deep learning (CNN-LSTM, Transformers) to network telemetry and log data for proactive intrusion detection, with Bayesian uncertainty quantification and SHAP-based explainability — designed for deployment in real-world Security Operations Centers.
          </p>
          <div className="badges">
            {["Intrusion Detection", "CNN-LSTM", "Transformers", "Bayesian Inference", "SHAP/LIME", "MLOps", "SOC", "IoT Security"].map(t => (
              <Badge key={t} variant="v">{t}</Badge>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects">
    <div className="w">
      <FadeIn>
        <span className="sec-label">Projects</span>
        <h2 className="sec-title">Technical Portfolio</h2>
        <p className="sec-sub">Full-stack security systems, ML implementations, and network engineering projects — all built from scratch.</p>
      </FadeIn>
      <div className="grid-3">
        {[
          {
            title: "Secure Multi-Role Web Portal",
            sub: "Full-Stack · Java EE · Security Engineering",
            bullets: [
              "Built from scratch using Java EE (Servlets/JSP) with strict MVC architecture",
              "RBAC for three user tiers (Admin, Standard, Guest) with industry-standard BCrypt password hashing",
              "Database-driven CMS with full event-logging module for complete system auditing",
              "Normalized MySQL schema deployed on Apache Tomcat",
            ],
            tech: ["Java EE", "JSP/Servlets", "MySQL", "BCrypt", "RBAC", "MVC", "Apache Tomcat"],
            media: { type: "video", src: "/files/SWEProject.mp4" },
            github: null,
          },
          {
            title: "ML Financial Forecasting System",
            sub: "ML Research · Python · Deep Learning",
            bullets: [
              "CNN-LSTM hybrid architecture for multi-asset financial time-series prediction",
              "Rolling-window backtesting with regime-change stress testing",
              "Comparative study of 5 model families across classical and deep learning",
              "Methodology transferable to cybersecurity anomaly detection pipelines",
            ],
            tech: ["Python", "TensorFlow", "scikit-learn", "LSTM", "CNN", "Pandas", "Matplotlib"],
            media: { type: "gif", src: "/files/ML%20Stock%20Prediction.gif" },
            github: "https://github.com/aftabalam01-creator/Stock-Forecasting-ML-AftabAlamMasjidi",
          },
          {
            title: "CRC Data Integrity Analyzer",
            sub: "Network Security · Java · Protocol Engineering",
            bullets: [
              "Java GUI implementing CRC algorithm with selectable polynomials for error detection",
              "Packetizes binary data and includes an integrity verification testing module",
              "Deep packet inspection using Wireshark across full TCP/IP stack",
              "Analysis covering HTTP, DNS, TCP, UDP with netstat/tracert/nslookup tooling",
            ],
            tech: ["Java", "Wireshark", "CRC", "TCP/IP", "GUI", "netstat", "nslookup"],
            media: { type: "none" },
            github: null,
          },
        ].map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="proj-card">
              <div className="proj-media">
                {p.media.type === "video" && (
                  <video src={p.media.src} controls muted />
                )}
                {p.media.type === "gif" && (
                  <img src={p.media.src} alt={p.title} />
                )}
                {p.media.type === "none" && (
                  <div className="proj-no-media">
                    <div className="proj-icon">🔐</div>
                    <span>Network Security Project</span>
                  </div>
                )}
              </div>
              <div className="proj-body">
                <div className="proj-title">{p.title}</div>
                <div className="proj-sub">{p.sub}</div>
                <ul className="proj-bullets">
                  {p.bullets.map(b => <li key={b.slice(0, 30)}>{b}</li>)}
                </ul>
                <div className="badges">
                  {p.tech.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
                {p.github && (
                  <div style={{ marginTop: 12 }}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600 }}>
                      GitHub Repository ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => {
  const SKILLS = {
    "Programming Languages": { items: ["Python", "Java", "JavaScript (ES6+)", "SQL", "HTML5/CSS3"], v: "" },
    "AI & Machine Learning": { items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "NLP", "CNN/LSTM", "Generative AI", "Transformers"], v: "g" },
    "Cybersecurity": { items: ["Wireshark", "Network Analysis", "Threat Modeling", "RBAC", "BCrypt", "Cryptography", "NTFS/MFT Forensics", "Packet Inspection"], v: "v" },
    "Web & Backend": { items: ["React.js", "Java EE", "JSP/Servlets", "MVC Pattern", "REST APIs", "Apache Tomcat"], v: "" },
    "Databases & Cloud": { items: ["MySQL", "Microsoft Azure", "Apache Tomcat"], v: "g" },
    "Developer Tools": { items: ["Git/GitHub", "Linux", "Eclipse IDE", "VS Code", "Jupyter Notebook", "Wireshark", "Vite.js"], v: "" },
    "Mathematics": { items: ["Probability & Statistics", "Linear Algebra", "Discrete Mathematics I & II", "Calculus"], v: "v" },
  };

  return (
    <section id="skills">
      <div className="w">
        <FadeIn>
          <span className="sec-label">Skills &amp; Tools</span>
          <h2 className="sec-title">Technical Expertise</h2>
          <p className="sec-sub">A broad technical foundation spanning security engineering, machine learning, and full-stack development.</p>
        </FadeIn>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, { items, v }], i) => (
            <FadeIn key={cat} delay={i * 0.06}>
              <div className="card">
                <div className="skill-cat">{cat}</div>
                <div className="badges">
                  {items.map(item => <Badge key={item} variant={v}>{item}</Badge>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Leadership = () => (
  <section id="leadership">
    <div className="w">
      <FadeIn>
        <span className="sec-label">Leadership &amp; Service</span>
        <h2 className="sec-title">Community Impact</h2>
        <p className="sec-sub">Founded and led multiple organizations, demonstrating initiative, communication, and organizational skills beyond the classroom.</p>
      </FadeIn>
      <div className="grid-2">
        <FadeIn delay={0.08}>
          <div className="card" style={{ padding: "28px 32px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              Organizations Founded &amp; Led
            </div>
            {[
              {
                period: "Sept 2025 – Present",
                role: "Founder & President",
                org: "AI Club @ Barry University",
                detail: "Founded and lead an active student community exploring AI, ML, and Data Analytics. Organize workshops, hackathons, and guest talks to promote hands-on learning and ethical AI development.",
              },
              {
                period: "Jan 2024 – Present",
                role: "Founder & President",
                org: "Muslim Students Association",
                detail: "Founded and lead 50+ member student community; coordinate campus-wide educational and cultural events, fostering inclusion and interfaith dialogue.",
              },
            ].map((item, i) => (
              <div className="ldr-item" key={item.org} style={{ paddingTop: i === 0 ? 0 : undefined }}>
                <div className="ldr-period">{item.period}</div>
                <div>
                  <div className="ldr-role">{item.role}</div>
                  <div className="ldr-org">{item.org}</div>
                  <div className="ldr-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="card" style={{ padding: "28px 32px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent2)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              Analyst &amp; Advisory Roles
            </div>
            {[
              {
                period: "Sept 2024 – Jan 2025",
                role: "Co-Managing Analyst",
                org: "Student Managed Investment Fund (SMIF)",
                detail: "Performed financial and technical valuation for tech-sector holdings; applied ML techniques to analyze market trends and inform investment decisions.",
              },
              {
                period: "2024 – 2025",
                role: "Co-Managing Director",
                org: "FinFit Thursday Initiative",
                detail: "Conducted workshops teaching financial literacy and data-driven decision-making to local high school students.",
              },
            ].map((item, i) => (
              <div className="ldr-item" key={item.org} style={{ paddingTop: i === 0 ? 0 : undefined }}>
                <div className="ldr-period">{item.period}</div>
                <div>
                  <div className="ldr-role">{item.role}</div>
                  <div className="ldr-org">{item.org}</div>
                  <div className="ldr-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2} style={{ marginTop: 28 }}>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Awards &amp; Recognition
          </div>
          <div className="awards-grid">
            {[
              { name: "Summa Cum Laude", desc: "Highest academic distinction, Barry University Class of 2026", color: "#f59e0b" },
              { name: "Stamps Scholar", desc: "Full-ride merit scholarship — top 0.5% of applicants nationally", color: "#34d399" },
              { name: "President's List · 5×", desc: "Multiple semesters of exceptional academic performance", color: "#38bdf8" },
              { name: "Dean's List 2024", desc: "Recognized for outstanding academic achievement", color: "#38bdf8" },
              { name: "Outstanding Performance Award 2024", desc: "Honored for innovation, leadership, and excellence in role", color: "#a78bfa" },
              { name: "Dr. George Wanko Award Nominee", desc: "Nominated for Outstanding Junior of the Year, Barry University", color: "#f87171" },
              { name: "CURO Symposium 2026 · Accepted", desc: "University of Georgia — competitive national undergraduate research symposium", color: "#34d399" },
              { name: "Barry STEM Symposium 2026", desc: "Research presentation accepted for university-wide symposium", color: "#38bdf8" },
            ].map(a => (
              <div className="award-item" key={a.name}>
                <div className="award-dot" style={{ background: a.color }} />
                <div>
                  <div className="award-name">{a.name}</div>
                  <div className="award-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const AcademicRecord = () => {
  const gpaData = {
    labels: Object.keys(SEMESTER_COURSES),
    datasets: [
      {
        label: "Semester GPA",
        data: [4.0, 4.0, 4.0, 3.867, 4.0, 4.0],
        borderColor: "rgba(56,189,248,0.9)",
        backgroundColor: "rgba(56,189,248,0.12)",
        pointBackgroundColor: "#34d399",
        pointBorderColor: "#34d399",
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.35,
        fill: true,
        borderWidth: 2,
      },
      {
        label: "Cumulative GPA",
        data: [4.0, 4.0, 4.0, 3.961, 3.968, 4.0],
        borderColor: "rgba(52,211,153,0.85)",
        backgroundColor: "rgba(52,211,153,0.06)",
        borderDash: [5, 4],
        pointBackgroundColor: "#38bdf8",
        pointRadius: 4,
        tension: 0.35,
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  const gpaOptions = {
    plugins: {
      legend: {
        display: true,
        labels: { color: "#94a3b8", font: { size: 12 }, boxWidth: 20, padding: 16 },
      },
      tooltip: {
        backgroundColor: "rgba(8,12,24,0.96)",
        borderColor: "rgba(56,189,248,0.3)",
        borderWidth: 1,
        titleColor: "#34d399",
        bodyColor: "#e2e8f0",
        padding: 14,
        displayColors: false,
        callbacks: {
          label: (ctx) => {
            if (ctx.dataset.label !== "Semester GPA") return `Cumulative GPA: ${ctx.parsed.y.toFixed(3)}`;
            const sem = ctx.label;
            const gpa = ctx.parsed.y.toFixed(3);
            const courses = SEMESTER_COURSES[sem] || [];
            return [
              `Term GPA: ${gpa}`,
              "─────────────────────",
              ...courses.map(([code, name, grade]) => `${code}  ${name} — ${grade}`),
            ];
          },
        },
      },
    },
    scales: {
      y: {
        min: 3.5, max: 4.01,
        ticks: { color: "#8896a5", font: { size: 11 } },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
      x: {
        ticks: { color: "#8896a5", font: { size: 11 } },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <section id="courses">
      <div className="w">
        <FadeIn>
          <span className="sec-label">Academic Record</span>
          <h2 className="sec-title">Courses &amp; GPA Trajectory</h2>
          <p className="sec-sub">Full transcript available on request. Hover any semester point to see individual courses and grades.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="card">
            <div className="chart-wrap">
              <div className="chart-title">Semester &amp; Cumulative GPA — 2022 → 2026</div>
              <div className="chart-hint">
                Hover a <span>Semester GPA</span> data point to see individual courses &amp; grades
              </div>
              <Line data={gpaData} options={gpaOptions} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Papers = () => (
  <section id="papers" style={{ paddingTop: 0 }}>
    <div className="w">
      <FadeIn>
        <span className="sec-label">Publications &amp; Papers</span>
        <h2 className="sec-title">Academic Writing</h2>
        <p className="sec-sub">Course papers and technical reports across cryptography, graph theory, and biometrics.</p>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          {
            title: "Hash Functions in Discrete Mathematics",
            notes: "Survey and implementation notes; collision properties; cryptographic vs. non-cryptographic trade-offs; security applications.",
            link: "/files/Aftab%20Alam%20-%20Hash%20Functions%20in%20Discrete%20Mathematics.pdf",
          },
          {
            title: "Minimum Spanning Tree &amp; Prim's Algorithm",
            notes: "Graph theory primer; proof sketch and complexity analysis; code implementation; applications in network topology design.",
            link: "/files/Aftab%20Alam%20-%20Minimal%20Spanning%20Tree%20and%20Prim%E2%80%99s%20Algorithm.pdf",
          },
          {
            title: "Biometrics — Selected Analyses",
            notes: "Ethical, AI-driven, and privacy-focused analyses of biometric technologies; alignment with GDPR and privacy-by-design principles.",
            link: "/files/BiOMETRICSS.pdf",
          },
        ].map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="paper-item">
              <div className="paper-num">0{i + 1}</div>
              <div>
                <div className="paper-title" dangerouslySetInnerHTML={{ __html: p.title }} />
                <div className="paper-notes">{p.notes}</div>
                <a className="paper-link" href={p.link} target="_blank" rel="noopener noreferrer">
                  Open PDF ↗
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Feed = () => (
  <section id="feed" style={{ paddingTop: 0 }}>
    <div className="w">
      <FadeIn>
        <span className="sec-label">LinkedIn</span>
        <h2 className="sec-title">Latest Posts</h2>
        <p className="sec-sub">Research updates and academic milestones shared publicly.</p>
      </FadeIn>
      <div className="grid-2">
        {[
          {
            href: "https://www.linkedin.com/posts/aftabalammasjidi_ai-machinelearning-deeplearning-activity-7388522435047862273-bXu5",
            img: "/files/LinkedInPost1.PNG",
            title: "AI × Deep Learning Research Update",
            desc: "Comparative study of ML and DL architectures for predictive analytics — translating financial models to security applications.",
          },
          {
            href: "https://www.linkedin.com/posts/aftabalammasjidi_barryuniversity-aicenter-stampsscholar-activity-7387710789618466817-RWae",
            img: "/files/LinkedInPost2.PNG",
            title: "Barry University AI Center &amp; Stamps Scholar Milestone",
            desc: "Updates on AI center leadership, active student projects, and academic milestones as Stamps Scholar.",
          },
        ].map((post, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <a className="feed-card" href={post.href} target="_blank" rel="noopener noreferrer">
              <img src={post.img} alt={post.title} />
              <div className="feed-body">
                <div className="feed-title" dangerouslySetInnerHTML={{ __html: post.title }} />
                <div className="feed-desc">{post.desc}</div>
                <span className="feed-cta">View on LinkedIn ↗</span>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact">
    <div className="w">
      <FadeIn>
        <div className="contact-cta">
          <span className="sec-label" style={{ display: "block", marginBottom: 10 }}>Get in Touch</span>
          <h2>Let's Work Together</h2>
          <p>
            I'm actively seeking cybersecurity roles in Europe — student assistantships at universities and full-time positions at tech, security, or research organizations. Open to relocating to Copenhagen and across Scandinavia.
          </p>
          <div className="contact-links">
            {[
              { href: "mailto:aftabalam.masjidi@mymail.barry.edu", label: "✉ Email Me", primary: true },
              { href: "https://www.linkedin.com/in/aftabalammasjidi", label: "LinkedIn ↗", primary: true },
              { href: "https://github.com/aftabalam01-creator", label: "GitHub ↗", primary: false },
              { href: "/files/AftabAlamMasjidi_CV.pdf", label: "↓ Download CV", primary: true },
            ].map(({ href, label, primary }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={`btn ${primary ? "btn-p" : "btn-s"}`}
              >
                {label}
              </a>
            ))}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 28 }}>
            📍 Miami, FL (currently) → Copenhagen, Denmark (Sept 2026)
            &nbsp;&nbsp;·&nbsp;&nbsp;
            📞 +1 (786) 210-7596
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>
            Documents
          </div>
          <div className="docs-row">
            {[
              { href: "/files/AftabAlamMasjidi_CV.pdf", label: "Academic CV" },
              { href: "/files/AftabBarryUniversityTranscript.pdf", label: "Official Transcript" },
              { href: "/files/AftabSOPMBZUAI.pdf", label: "Statement of Purpose" },
              { href: "/files/Nominations.pdf", label: "Nomination Letters" },
              { href: "/files/2025 Dr. George Wanko Award for Outstanding Junior Nomination - Aftab Alam Masjidi.pdf", label: "Wanko Award Nomination" },
            ].map(({ href, label }) => (
              <a key={href} className="doc-link" href={href} target="_blank" rel="noopener noreferrer">
                📄 {label}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <ThemeStyles />
      <Navbar />
      <Hero />
      <StatsBar />
      <Education />
      <Experience />
      <Research />
      <Projects />
      <Skills />
      <Leadership />
      <AcademicRecord />
      <Papers />
      <Feed />
      <Contact />
      <footer className="footer">
        <div className="w">
          <div className="footer-brand">Aftab Alam Masjidi · Cybersecurity &amp; AI</div>
          <div className="footer-copy">
            © {new Date().getFullYear()} · Barry University Alumnus (Summa Cum Laude) · Incoming MSc Cybersecurity, Aalborg University Copenhagen
          </div>
          <div style={{ marginTop: 10, fontSize: "0.72rem", color: "rgba(136,150,165,0.5)" }}>
            aftabalam.masjidi@mymail.barry.edu · linkedin.com/in/aftabalammasjidi
          </div>
        </div>
      </footer>
    </>
  );
}
