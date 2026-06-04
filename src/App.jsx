import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    :root {
      --bg:      #030508;
      --s1:      #070c14;
      --s2:      #0b1220;
      --card:    #0d1829;
      --border:  rgba(0,200,255,0.08);
      --border2: rgba(0,200,255,0.22);
      --cyan:    #00c8ff;
      --green:   #00e87a;
      --purple:  #9b5de5;
      --gold:    #f5c518;
      --orange:  #ff6b35;
      --text:    #ddeeff;
      --muted:   #5a7a96;
      --glow-c:  0 0 24px rgba(0,200,255,0.35);
      --glow-g:  0 0 24px rgba(0,232,122,0.35);
      --glow-p:  0 0 24px rgba(155,93,229,0.35);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', system-ui, sans-serif;
      line-height: 1.65;
      overflow-x: hidden;
    }

    /* subtle hex grid overlay on body */
    body::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15z' fill='none' stroke='%2300c8ff' stroke-opacity='0.025' stroke-width='1'/%3E%3C/svg%3E");
      background-size: 28px 49px;
    }

    #root { position: relative; z-index: 1; }

    a { color: var(--cyan); text-decoration: none; transition: color 0.2s; }
    a:hover { color: var(--green); }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.3); border-radius: 2px; }

    /* ── NAVBAR ─── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      background: rgba(3,5,8,0.82);
      backdrop-filter: blur(20px) saturate(200%);
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 32px;
      height: 58px; display: flex; align-items: center; justify-content: space-between;
    }
    .nav-brand {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 8px;
    }
    .nav-blink {
      display: inline-block; width: 8px; height: 14px;
      background: var(--cyan); border-radius: 1px;
      animation: blink 1.1s step-end infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }
    .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
    .nav-links a {
      color: var(--muted); font-size: 0.8rem; font-weight: 500;
      padding: 5px 10px; border-radius: 6px; transition: all 0.18s;
    }
    .nav-links a:hover { color: var(--text); background: rgba(0,200,255,0.07); }
    .nav-cv {
      color: var(--cyan) !important; font-weight: 700 !important;
      border: 1px solid rgba(0,200,255,0.3) !important;
      background: rgba(0,200,255,0.07) !important;
    }
    .nav-cv:hover { box-shadow: var(--glow-c); transform: translateY(-1px); }

    /* ── HERO ─── */
    .hero {
      position: relative; min-height: 100svh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 80px 32px 60px; text-align: center; overflow: hidden;
    }
    .hero-canvas {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none;
    }
    .hero-inner { position: relative; z-index: 2; max-width: 900px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 8px 20px; border-radius: 999px; margin-bottom: 32px;
      background: rgba(0,232,122,0.06);
      border: 1px solid rgba(0,232,122,0.25);
      font-size: 0.82rem; font-weight: 700; color: var(--green);
      letter-spacing: 0.02em;
    }
    .badge-dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--green);
      box-shadow: 0 0 8px var(--green);
      animation: badge-pulse 2s ease-in-out infinite;
    }
    @keyframes badge-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(0,232,122,0.6), 0 0 8px var(--green); }
      50%      { box-shadow: 0 0 0 6px rgba(0,232,122,0), 0 0 8px var(--green); }
    }
    .hero h1 {
      font-size: clamp(3rem, 8vw, 6.5rem);
      font-weight: 900; letter-spacing: -0.04em; line-height: 1.0;
      margin-bottom: 24px;
      background: linear-gradient(135deg, #e8f8ff 0%, var(--cyan) 45%, var(--green) 80%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 30px rgba(0,200,255,0.25));
    }
    .hero-title {
      font-size: clamp(0.95rem, 2vw, 1.2rem);
      font-family: 'JetBrains Mono', monospace;
      color: var(--cyan); font-weight: 600; margin-bottom: 20px;
      letter-spacing: 0.06em; text-transform: uppercase;
    }
    .hero-edu {
      display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px;
      align-items: center;
    }
    .hero-edu-row {
      display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap;
      justify-content: center;
      font-size: 0.9rem; color: var(--muted);
    }
    .hero-edu-row strong { color: var(--text); font-weight: 700; }
    .hero-edu-row .hl { color: var(--gold); font-weight: 800; }
    .hero-edu-row .hl2 { color: var(--green); font-weight: 700; }
    .sep { color: rgba(90,122,150,0.35); }
    .hero-location {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem; color: var(--muted); margin-bottom: 36px;
    }
    .hero-location .arrow { color: var(--cyan); }
    .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .hbtn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: 10px;
      font-size: 0.875rem; font-weight: 700; transition: all 0.22s;
      letter-spacing: 0.01em;
    }
    .hbtn-p {
      background: linear-gradient(135deg, rgba(0,200,255,0.18), rgba(0,232,122,0.12));
      border: 1px solid rgba(0,200,255,0.4); color: var(--cyan);
    }
    .hbtn-p:hover { box-shadow: var(--glow-c); transform: translateY(-3px); color: var(--cyan); }
    .hbtn-s {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      color: var(--muted);
    }
    .hbtn-s:hover { background: rgba(255,255,255,0.08); color: var(--text); transform: translateY(-2px); }
    .scroll-hint {
      position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      color: var(--muted); font-size: 0.72rem; letter-spacing: 0.08em;
      font-family: 'JetBrains Mono', monospace; animation: float 2.5s ease-in-out infinite;
    }
    .scroll-chevron { font-size: 1.1rem; }
    @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }

    /* ── STATS BAR ─── */
    .stats { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .stats-inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
    .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); }
    .stat {
      padding: 30px 16px; text-align: center;
      border-right: 1px solid var(--border);
      transition: background 0.2s;
    }
    .stat:last-child { border-right: none; }
    .stat:hover { background: rgba(0,200,255,0.03); }
    .stat-n {
      font-size: 1.6rem; font-weight: 900; letter-spacing: -0.03em;
      font-family: 'JetBrains Mono', monospace;
    }
    .stat-n.c { color: var(--cyan); text-shadow: 0 0 20px rgba(0,200,255,0.4); }
    .stat-n.g { color: var(--green); text-shadow: 0 0 20px rgba(0,232,122,0.4); }
    .stat-n.p { color: var(--purple); text-shadow: 0 0 20px rgba(155,93,229,0.4); }
    .stat-n.gold { color: var(--gold); text-shadow: 0 0 20px rgba(245,197,24,0.4); }
    .stat-lbl { font-size: 0.76rem; font-weight: 700; color: var(--text); margin-top: 5px; letter-spacing: 0.04em; text-transform: uppercase; }
    .stat-sub { font-size: 0.68rem; color: var(--muted); margin-top: 3px; }

    /* ── LAYOUT ─── */
    .w { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
    section { padding: 96px 0; }
    .sec-lbl {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--cyan); display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
    }
    .sec-lbl::before { content: '//'; opacity: 0.5; }
    .sec-h { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 8px; }
    .sec-sub { color: var(--muted); font-size: 0.92rem; margin-bottom: 56px; }

    /* ── CARD ─── */
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 18px; padding: 28px; position: relative; overflow: hidden;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .card::before {
      content: ''; position: absolute; inset: 0; border-radius: 18px;
      background: radial-gradient(circle at top right, rgba(0,200,255,0.04), transparent 60%);
      pointer-events: none;
    }
    .card:hover { border-color: var(--border2); box-shadow: 0 0 40px rgba(0,200,255,0.07), 0 20px 60px rgba(0,0,0,0.4); transform: translateY(-4px); }
    .card-c { border-left: 2px solid var(--cyan); }
    .card-g { border-left: 2px solid var(--green); }
    .card-p { border-left: 2px solid var(--purple); }
    .card-gold { border-left: 2px solid var(--gold); }

    /* ── BADGE ─── */
    .tag {
      display: inline-flex; align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; font-weight: 600;
      padding: 3px 9px; border-radius: 5px;
    }
    .tag-c { background: rgba(0,200,255,0.08); border: 1px solid rgba(0,200,255,0.2); color: #7ee8ff; }
    .tag-g { background: rgba(0,232,122,0.08); border: 1px solid rgba(0,232,122,0.2); color: #6effa7; }
    .tag-p { background: rgba(155,93,229,0.08); border: 1px solid rgba(155,93,229,0.2); color: #c4a3f0; }
    .tag-gold { background: rgba(245,197,24,0.08); border: 1px solid rgba(245,197,24,0.2); color: #fde68a; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }

    /* ── GRID ─── */
    .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }

    /* ── TERMINAL WINDOW ─── */
    .terminal {
      background: #020408; border: 1px solid rgba(0,200,255,0.15);
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 0 60px rgba(0,200,255,0.08), 0 30px 80px rgba(0,0,0,0.6);
    }
    .term-bar {
      background: #0c1520; padding: 10px 16px;
      display: flex; align-items: center; gap: 8px;
      border-bottom: 1px solid rgba(0,200,255,0.08);
    }
    .term-dot { width: 11px; height: 11px; border-radius: 50%; }
    .term-title { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--muted); margin-left: auto; }
    .term-body { padding: 20px 22px; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; line-height: 1.9; min-height: 280px; }
    .t-cmd { color: var(--cyan); }
    .t-cmd::before { content: '❯ '; color: var(--green); }
    .t-out { color: #7a9ab8; padding-left: 14px; }
    .t-key { color: var(--cyan); }
    .t-val { color: var(--green); }
    .t-str { color: #f0c674; }
    .t-ok { color: var(--green); font-weight: 700; }
    .t-cursor { display: inline-block; width: 8px; height: 15px; background: var(--cyan); vertical-align: middle; animation: blink 1.1s step-end infinite; }

    /* ── EDUCATION ─── */
    .edu-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 20px; padding: 36px; overflow: hidden; position: relative;
      transition: all 0.3s;
    }
    .edu-card::after {
      content: ''; position: absolute; top: 0; right: 0;
      width: 200px; height: 200px; border-radius: 0 20px 0 100%;
      pointer-events: none; opacity: 0.04;
    }
    .edu-card-a::after { background: var(--cyan); }
    .edu-card-b::after { background: var(--green); }
    .edu-card:hover { transform: translateY(-5px); border-color: var(--border2); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .edu-status {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 14px; border-radius: 999px;
      font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
      margin-bottom: 22px;
    }
    .edu-st-a { background: rgba(0,200,255,0.08); border: 1px solid rgba(0,200,255,0.25); color: var(--cyan); }
    .edu-st-b { background: rgba(0,232,122,0.08); border: 1px solid rgba(0,232,122,0.25); color: var(--green); }
    .edu-inst { font-size: 1.3rem; font-weight: 900; color: var(--text); margin-bottom: 5px; }
    .edu-deg { font-size: 0.95rem; font-weight: 700; color: var(--cyan); margin-bottom: 8px; }
    .edu-meta { font-size: 0.8rem; color: var(--muted); display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
    .edu-honors {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 16px; border-radius: 10px;
      background: rgba(245,197,24,0.08); border: 1px solid rgba(245,197,24,0.25);
      font-size: 0.82rem; font-weight: 900; color: var(--gold);
      text-shadow: 0 0 12px rgba(245,197,24,0.4); margin-bottom: 20px;
    }
    .edu-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .edu-list li { display: flex; gap: 9px; font-size: 0.82rem; color: var(--muted); line-height: 1.45; }
    .edu-list li::before { content: '→'; color: var(--green); flex-shrink: 0; font-size: 0.78rem; margin-top: 1px; }

    /* ── TIMELINE ─── */
    .tl { position: relative; padding-left: 0; }
    .tl-line {
      position: absolute; left: 22px; top: 12px; bottom: 12px; width: 1px;
      background: linear-gradient(to bottom, var(--cyan), rgba(0,200,255,0.05));
    }
    .tl-item { position: relative; padding-left: 62px; margin-bottom: 48px; }
    .tl-item:last-child { margin-bottom: 0; }
    .tl-dot {
      position: absolute; left: 14px; top: 6px;
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--s1); border: 2px solid var(--cyan);
      box-shadow: 0 0 12px rgba(0,200,255,0.4);
    }
    .tl-when { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 700; color: var(--green); margin-bottom: 6px; display: flex; align-items: center; gap: 10px; }
    .tl-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.62rem; font-weight: 800; background: rgba(0,232,122,0.08); border: 1px solid rgba(0,232,122,0.18); color: var(--green); letter-spacing: 0.05em; text-transform: uppercase; }
    .tl-role { font-size: 1.12rem; font-weight: 800; color: var(--text); }
    .tl-co { font-size: 0.88rem; font-weight: 700; color: var(--cyan); margin-bottom: 14px; }
    .tl-pts { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .tl-pts li { display: flex; gap: 10px; font-size: 0.875rem; color: var(--muted); line-height: 1.5; }
    .tl-pts li::before { content: '▸'; color: var(--green); flex-shrink: 0; font-size: 0.72rem; margin-top: 3px; }

    /* ── RESEARCH ─── */
    .res-wrap {
      background: linear-gradient(135deg, rgba(0,200,255,0.04), rgba(155,93,229,0.03));
      border: 1px solid rgba(0,200,255,0.12); border-radius: 22px; padding: 42px;
      position: relative; overflow: hidden;
    }
    .res-wrap::before {
      content: 'RESEARCH'; position: absolute; right: -20px; top: -20px;
      font-size: 8rem; font-weight: 900; color: rgba(0,200,255,0.02);
      font-family: 'JetBrains Mono', monospace; letter-spacing: -0.05em; pointer-events: none;
      line-height: 1;
    }
    .res-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
    .res-pill {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 16px; border-radius: 999px;
      background: rgba(0,232,122,0.07); border: 1px solid rgba(0,232,122,0.22);
      font-size: 0.76rem; font-weight: 800; color: var(--green);
    }
    .res-pill::before { content: '✓'; }
    .res-title { font-size: 1.25rem; font-weight: 900; margin-bottom: 6px; }
    .res-super { font-size: 0.82rem; color: var(--muted); margin-bottom: 26px; font-style: italic; }
    .res-pts { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .res-pts li {
      display: flex; gap: 14px; font-size: 0.875rem; color: var(--muted); line-height: 1.6;
      padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.03);
    }
    .res-pts li:last-child { border-bottom: none; padding-bottom: 0; }
    .res-pts li::before { content: '◆'; color: var(--cyan); flex-shrink: 0; font-size: 0.55rem; margin-top: 7px; }

    /* ── SKILL BARS ─── */
    .skills-section { background: var(--s1); }
    .skill-group { display: flex; flex-direction: column; gap: 4px; }
    .skill-group-title {
      font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.14em; color: var(--cyan);
      margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
    }
    .skill-group-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .skill-row { margin-bottom: 13px; }
    .skill-info { display: flex; justify-content: space-between; margin-bottom: 5px; }
    .skill-name { font-size: 0.82rem; font-weight: 600; color: var(--text); }
    .skill-pct { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); }
    .skill-track { height: 3px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
    .skill-fill {
      height: 100%; border-radius: 2px;
      transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* ── PROJECTS ─── */
    .proj {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 18px; overflow: hidden; transition: all 0.3s;
      display: flex; flex-direction: column;
    }
    .proj:hover { border-color: var(--border2); transform: translateY(-5px); box-shadow: 0 0 40px rgba(0,200,255,0.07), 0 20px 60px rgba(0,0,0,0.5); }
    .proj-media {
      width: 100%; height: 200px; background: #060c16;
      overflow: hidden; display: flex; align-items: center; justify-content: center;
      border-bottom: 1px solid var(--border); position: relative;
    }
    .proj-media img, .proj-media video { width: 100%; height: 100%; object-fit: cover; }
    .proj-placeholder {
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      color: var(--muted); font-size: 0.8rem;
    }
    .proj-placeholder-icon { font-size: 2.5rem; opacity: 0.3; }
    .proj-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
    .proj-title { font-size: 1rem; font-weight: 800; margin-bottom: 3px; }
    .proj-sub { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 14px; }
    .proj-pts { list-style: none; flex: 1; display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .proj-pts li { display: flex; gap: 8px; font-size: 0.81rem; color: var(--muted); line-height: 1.5; }
    .proj-pts li::before { content: '•'; color: var(--green); flex-shrink: 0; }

    /* ── LEADERSHIP ─── */
    .ldr-item { display: flex; gap: 22px; padding: 20px 0; border-bottom: 1px solid var(--border); }
    .ldr-item:last-child { border-bottom: none; padding-bottom: 0; }
    .ldr-when { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--green); font-weight: 700; min-width: 125px; flex-shrink: 0; padding-top: 2px; }
    .ldr-role { font-size: 0.93rem; font-weight: 800; }
    .ldr-org { font-size: 0.82rem; color: var(--cyan); font-weight: 700; margin-bottom: 4px; }
    .ldr-detail { font-size: 0.79rem; color: var(--muted); line-height: 1.5; }

    /* ── AWARDS ─── */
    .awards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }
    .award {
      padding: 15px 18px; border-radius: 12px;
      background: rgba(255,255,255,0.02); border: 1px solid var(--border);
      display: flex; gap: 13px; align-items: flex-start; transition: all 0.2s;
    }
    .award:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); }
    .award-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
    .award-name { font-size: 0.87rem; font-weight: 800; }
    .award-desc { font-size: 0.76rem; color: var(--muted); margin-top: 2px; line-height: 1.4; }

    /* ── CHART ─── */
    .chart-wrap { background: rgba(0,0,0,0.35); border: 1px solid var(--border); border-radius: 14px; padding: 26px; }

    /* ── PAPERS ─── */
    .paper {
      display: flex; gap: 20px; padding: 20px; border-radius: 14px;
      border: 1px solid var(--border); background: rgba(255,255,255,0.02); transition: all 0.22s;
    }
    .paper:hover { border-color: var(--border2); background: rgba(0,200,255,0.03); }
    .paper-n { font-family: 'JetBrains Mono', monospace; font-size: 1.4rem; font-weight: 900; color: rgba(0,200,255,0.15); flex-shrink: 0; width: 36px; }
    .paper-title { font-size: 0.92rem; font-weight: 800; margin-bottom: 4px; }
    .paper-notes { font-size: 0.79rem; color: var(--muted); line-height: 1.5; }
    .paper-link { font-size: 0.77rem; color: var(--cyan); font-weight: 700; display: inline-block; margin-top: 9px; }

    /* ── FEED ─── */
    .feed-card {
      border-radius: 14px; overflow: hidden; background: rgba(255,255,255,0.02);
      border: 1px solid var(--border); transition: all 0.3s; display: block;
    }
    .feed-card:hover { border-color: var(--border2); transform: translateY(-5px); box-shadow: 0 14px 50px rgba(0,0,0,0.4); }
    .feed-card img { width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid var(--border); }
    .feed-body { padding: 18px; }
    .feed-title { font-size: 0.92rem; font-weight: 800; margin-bottom: 5px; }
    .feed-desc { font-size: 0.79rem; color: var(--muted); line-height: 1.5; }
    .feed-cta { font-size: 0.77rem; color: var(--cyan); font-weight: 700; display: inline-block; margin-top: 10px; }

    /* ── CONTACT CTA ─── */
    .cta-box {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, rgba(0,200,255,0.05), rgba(155,93,229,0.04), rgba(0,232,122,0.03));
      border: 1px solid rgba(0,200,255,0.14); border-radius: 26px; padding: 80px 56px; text-align: center;
    }
    .cta-box::before {
      content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
      width: 60%; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    }
    .cta-box h2 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 14px; }
    .cta-box p { color: var(--muted); max-width: 540px; margin: 0 auto 36px; font-size: 0.95rem; line-height: 1.7; }
    .cta-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
    .docs-row { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
    .doc-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 8px; font-size: 0.79rem; font-weight: 600;
      background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--muted);
      transition: all 0.2s;
    }
    .doc-link:hover { border-color: rgba(0,200,255,0.3); color: var(--cyan); background: rgba(0,200,255,0.05); }

    /* ── FOOTER ─── */
    .footer { border-top: 1px solid var(--border); padding: 48px 0; text-align: center; }
    .footer-brand { font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; color: var(--green); font-weight: 700; margin-bottom: 8px; }
    .footer-copy { font-size: 0.78rem; color: var(--muted); }

    /* ── ACCORDION ─── */
    .acc-btn {
      display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
      padding: 8px 18px; border-radius: 10px; margin-top: 18px;
      background: rgba(0,232,122,0.06); border: 1px solid rgba(0,232,122,0.2);
      color: var(--green); font-size: 0.82rem; font-weight: 800; transition: all 0.22s;
    }
    .acc-btn:hover { box-shadow: var(--glow-g); }
    .acc-body {
      margin-top: 16px; overflow: hidden; white-space: pre-wrap;
      color: var(--muted); background: rgba(0,0,0,0.35); border: 1px solid var(--border);
      padding: 20px; border-radius: 12px; font-size: 0.82rem;
      font-family: 'JetBrains Mono', monospace; line-height: 1.8;
    }

    /* ── RESPONSIVE ─── */
    @media (max-width: 1024px) { .g3 { grid-template-columns: 1fr 1fr; } .stats-grid { grid-template-columns: repeat(3,1fr); } .stat:nth-child(3) { border-right: none; } }
    @media (max-width: 768px) {
      .g2, .g3 { grid-template-columns: 1fr; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stat:nth-child(2) { border-right: none; }
      .stat:nth-child(5) { grid-column: 1 / -1; border-right: none; }
      .ldr-item { flex-direction: column; gap: 6px; }
      .cta-box { padding: 48px 24px; }
      .res-wrap { padding: 26px; }
    }
    @media (max-width: 860px) { .nav-links { display: none; } }
    @media (max-width: 520px) { .w { padding: 0 20px; } section { padding: 72px 0; } .hero { padding: 80px 20px 60px; } }
  `}</style>
);

// ─── COURSE DATA ──────────────────────────────────────────────────────────────
const SEMESTER_COURSES = {
  "Fall 2022":   [["ENG 111","First-Year Composition & Rhetoric","A"],["ORI 100","First-Year Experience Seminar","A"],["PSY 281","Intro to Psychology","A"],["POS 201","American Government","A"],["MUA 123","Applied Music: Classical Guitar","A"]],
  "Spring 2023": [["ENG 112","Techniques of Research","A"],["SPE 101","Fundamentals of Speech","A"],["CS 180","Intro to Digital Literacy","A"],["MAT 109","Precalculus I","A"]],
  "Fall 2023":   [["BUS 181","Intro to Business","A"],["CS 231","Computer Science I","A"],["CS 332","Computer Hardware Organization","A"],["PHI 220","Intro to Philosophy","A"],["ISR 165","Tennis","A"]],
  "Spring 2024": [["CS 232","Computer Science II","A"],["CS 306","DB & Logic Design","A"],["CS 340","Programming for the Web","A"],["MAT 211","Calculus I","B+"],["CS 317","Ethics & Digital Technology","A"]],
  "Fall 2024":   [["CS 331","Data Structures & Algorithms","A"],["CS 440","Data Communications","A"],["PHY 201","General College Physics I","A"],["SOC 200","Society & Social Justice","A"],["THE 201","Theology: Faith & Beliefs","A"]],
  "Spring 2025": [["CS 318","Biometrics","A"],["CS 474","Computer Forensics","A"],["CS 477","Computer Security","A"],["MAT 253","Discrete Math II","A"],["HIS 150","Meaning of History","A"]],
};

const RESEARCH_STATEMENT = `Research Statement — Hybrid AI Framework for Predictive Cybersecurity

1. Abstract
Modern cybersecurity systems remain largely reactive. As attack vectors evolve and user
behaviors become more dynamic, static ML approaches fail to adapt. This research proposes a
hybrid AI framework integrating deep learning, behavioral modeling, and probabilistic inference
to achieve proactive cyber threat prediction — detecting anomalies before compromise occurs.

2. Methodology
  • Data: UNSW-NB15, CICIDS2017, TON_IoT datasets
  • Stage 1 — Sequential Modeling: CNN-LSTM backbone for local spatial + temporal dependencies
  • Stage 2 — Probabilistic Layer: Bayesian/Gaussian uncertainty to reduce false positives
  • Stage 3 — Explainability: SHAP/LIME attention module for analyst trust and insight
  • Evaluation: Precision, Recall, F1-score, ROC-AUC; simulated SIEM environment

3. Key Insight from Financial Research
Classical models frequently outperformed deep architectures during regime changes —
a finding directly transferable to cybersecurity: behavioral drift in networks mimics
non-stationarity in financial time series, requiring drift-aware adaptive pipelines.

4. Expected Outcomes
  1. Validated, explainable deep learning model for predictive threat detection
  2. Publication target: IEEE Trans. on Information Forensics and Security
  3. Modular SOC-ready deployment architecture`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

/* Particle Network Canvas */
const ParticleNetwork = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 55;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.5 + 0.8,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.strokeStyle = `rgba(0,200,255,${0.18 * (1 - d / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.fillStyle = "rgba(0,200,255,0.55)";
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(0,200,255,0.6)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
};

/* Animated Counter */
const Counter = ({ target, suffix = "", isFloat = false }) => {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0;
      const step = target / 60;
      const tick = () => {
        cur = Math.min(cur + step, target);
        setV(isFloat ? Math.round(cur * 10) / 10 : Math.round(cur));
        if (cur < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, isFloat]);
  return <span ref={ref}>{v}{suffix}</span>;
};

/* Animated Skill Bar */
const SkillBar = ({ name, pct, color = "var(--cyan)" }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setTimeout(() => setW(pct), 150);
      obs.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}55` }} />
      </div>
    </div>
  );
};

/* Terminal Window */
const Terminal = () => {
  const lines = [
    { t: "cmd", v: "whoami" },
    { t: "out", v: "aftab-alam-masjidi" },
    { t: "cmd", v: "cat profile.json" },
    { t: "out", v: '{' },
    { t: "kv",  k: '"degree"',      v: '"B.S. Computer Science — Specialization: Cybersecurity"' },
    { t: "kv",  k: '"honors"',       v: '"Summa Cum Laude"' },
    { t: "kv",  k: '"gpa"',          v: '4.0' },
    { t: "kv",  k: '"scholarship"',  v: '"Stamps Scholar (top 0.5%)"' },
    { t: "kv",  k: '"next"',         v: '"M.Sc. Cybersecurity @ Aalborg Univ. Copenhagen"' },
    { t: "kv",  k: '"available"',    v: '"European cybersecurity roles — Sept 2026"' },
    { t: "out", v: '}' },
    { t: "cmd", v: "ping recruiter --status" },
    { t: "ok",  v: "[✓ OPEN TO HIRE]  Denmark · Scandinavia · EU · Remote" },
  ];
  const [vis, setVis] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVis(v => { if (v >= lines.length) { clearInterval(t); return v; } return v + 1; }), 160);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="terminal">
      <div className="term-bar">
        <div className="term-dot" style={{ background: "#ff5f57" }} />
        <div className="term-dot" style={{ background: "#febc2e" }} />
        <div className="term-dot" style={{ background: "#28c840" }} />
        <span className="term-title">credentials.sh — aftab@portfolio</span>
      </div>
      <div className="term-body">
        {lines.slice(0, vis).map((l, i) => (
          <div key={i}>
            {l.t === "cmd" && <div className="t-cmd">{l.v}</div>}
            {l.t === "out" && <div className="t-out">{l.v}</div>}
            {l.t === "kv"  && <div className="t-out"><span className="t-key">{l.k}</span>: <span className="t-str">{l.v}</span>,</div>}
            {l.t === "ok"  && <div className="t-ok" style={{ paddingLeft: 14 }}>{l.v}</div>}
          </div>
        ))}
        {vis >= lines.length && <div className="t-cmd" style={{ display: "inline" }}><span className="t-cursor" /></div>}
      </div>
    </div>
  );
};

const Accordion = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="acc-btn" onClick={() => setOpen(s => !s)}>
        {open ? "▲ Collapse" : "▼ Read Full Research Statement"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.pre initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="acc-body">
            {text}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

const Navbar = () => (
  <nav className="nav">
    <div className="nav-inner">
      <div className="nav-brand">
        <span style={{ color: "var(--green)" }}>aftab</span>
        <span style={{ color: "var(--cyan)" }}>@</span>
        <span style={{ color: "var(--muted)" }}>portfolio</span>
        <span className="nav-blink" />
      </div>
      <ul className="nav-links">
        {[["#education","edu"],["#experience","exp"],["#research","research"],["#projects","projects"],["#skills","skills"],["#leadership","leadership"],["#courses","academics"],["#contact","contact"]].map(([h,l]) => (
          <li key={h}><a href={h}>{l}</a></li>
        ))}
        <li><a href="/files/AftabAlamMasjidi_CV.pdf" target="_blank" rel="noopener noreferrer" className="nav-cv">↓ CV</a></li>
      </ul>
    </div>
  </nav>
);

const Hero = () => {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const name = "Aftab Alam Masjidi";
    let i = 0;
    const t = setInterval(() => { setTyped(name.slice(0, i++)); if (i > name.length) clearInterval(t); }, 65);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero">
      <ParticleNetwork />
      <div className="hero-inner">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="hero-badge">
            <span className="badge-dot" />
            AVAILABLE — Cybersecurity Roles in Europe · Student Assistantships &amp; Full-Time
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ minHeight: "1.05em" }}>
          {typed || " "}
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>
          <div className="hero-title">Cybersecurity Engineer &amp; AI Researcher</div>
          <div className="hero-edu">
            <div className="hero-edu-row">
              <strong>B.S. Computer Science</strong>
              <span className="sep">|</span>
              <span>Barry University</span>
              <span className="sep">|</span>
              <span className="hl">Summa Cum Laude · GPA 4.0</span>
              <span className="sep">|</span>
              <span>Graduated May 2026</span>
            </div>
            <div className="hero-edu-row">
              <strong>M.Sc. Cybersecurity</strong>
              <span className="sep">|</span>
              <span>Aalborg University Copenhagen, Denmark</span>
              <span className="sep">|</span>
              <span className="hl2">Incoming · 2026 – 2028</span>
            </div>
          </div>
          <div className="hero-location">
            <span>📍 Miami, FL, USA</span>
            <span className="arrow">——→</span>
            <span>Copenhagen, Denmark (Sept 2026)</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62 }}>
          <div className="hero-btns">
            <a className="hbtn hbtn-p" href="/files/AftabAlamMasjidi_CV.pdf" target="_blank" rel="noopener noreferrer">↓ Download CV</a>
            <a className="hbtn hbtn-p" href="https://www.linkedin.com/in/aftabalammasjidi" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="hbtn hbtn-s" href="https://github.com/aftabalam01-creator" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="hbtn hbtn-s" href="mailto:aftabalam.masjidi@mymail.barry.edu">Email</a>
          </div>
        </motion.div>
      </div>
      <div className="scroll-hint">
        <span className="scroll-chevron">↓</span>
        <span>scroll</span>
      </div>
    </div>
  );
};

const StatsBar = () => (
  <div className="stats">
    <div className="stats-inner">
      <div className="stats-grid">
        {[
          { n: "4.0", sfx: "", cls: "gold",  lbl: "GPA",              sub: "Perfect Academic Record",       isFloat: false },
          { n: 5,     sfx: "×", cls: "c",     lbl: "President's List", sub: "Consecutive Semesters",         isFloat: false },
          { n: 0.5,   sfx: "%", cls: "g",     lbl: "Stamps Scholar",   sub: "Top 0.5% — Full-Ride Merit",    isFloat: true  },
          { n: 3,     sfx: "",  cls: "p",     lbl: "Major Projects",   sub: "Security · ML · Networking",    isFloat: false },
          { n: 2026,  sfx: "",  cls: "c",     lbl: "MSc Start",        sub: "Aalborg Univ. Copenhagen",      isFloat: false },
        ].map(({ n, sfx, cls, lbl, sub, isFloat }) => (
          <div className="stat" key={lbl}>
            <div className={`stat-n ${cls}`}>
              {typeof n === "string" ? n : <Counter target={n} suffix={sfx} isFloat={isFloat} />}
            </div>
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
        <div className="sec-lbl">Education</div>
        <h2 className="sec-h">Academic Foundation</h2>
        <p className="sec-sub">A rigorous Computer Science + Cybersecurity degree from the US, transitioning into European academic and industry circles.</p>
      </FadeIn>
      <div className="g2">
        <FadeIn delay={0.08}>
          <div className="edu-card edu-card-a">
            <div className="edu-status edu-st-a">
              <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--cyan)", display:"inline-block", boxShadow:"0 0 8px var(--cyan)", animation:"badge-pulse 2s ease-in-out infinite" }} />
              Incoming · September 2026
            </div>
            <div className="edu-inst">Aalborg University Copenhagen</div>
            <div className="edu-deg">M.Sc. Cybersecurity</div>
            <div className="edu-meta"><span>📍 Copenhagen, Denmark</span><span>🗓 2026 – 2028</span></div>
            <ul className="edu-list">
              {["Research-intensive program aligned with EU cybersecurity frameworks and GDPR","Focus: Network Security, Cryptography, AI-driven Threat Detection","Strong industry ties across Scandinavia — gateway to European tech sector","Pursuing student assistant (studentermedhjælper) roles during studies"].map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.16}>
          <div className="edu-card edu-card-b">
            <div className="edu-status edu-st-b">✓ Graduated May 2026</div>
            <div className="edu-inst">Barry University</div>
            <div className="edu-deg">B.S. Computer Science · Specialization: Cybersecurity</div>
            <div className="edu-meta"><span>📍 Miami, FL, USA</span><span>🗓 2022 – 2026</span><span style={{color:"var(--cyan)",fontWeight:700}}>GPA 4.0 / 4.0</span></div>
            <div className="edu-honors">🏅 Summa Cum Laude — Highest Academic Distinction</div>
            <ul className="edu-list">
              {["Stamps Scholar — Full-ride merit scholarship, top 0.5% nationally","President's List — 5 consecutive semesters","Dean's List 2024 · Outstanding Performance Award 2024","Accepted: CURO Symposium 2026 (UGA) & Barry STEM Symposium 2026"].map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} style={{ marginTop: 28 }}>
        <div style={{ marginTop: 28 }}>
          <Terminal />
        </div>
      </FadeIn>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" style={{ paddingTop: 0 }}>
    <div className="w">
      <FadeIn>
        <div className="sec-lbl">Experience</div>
        <h2 className="sec-h">Work History</h2>
        <p className="sec-sub">Engineering and research roles combining AI deployment, software development, and cybersecurity.</p>
      </FadeIn>
      <div className="card">
        <div className="tl">
          <div className="tl-line" />
          {[
            { when:"Sept 2025 – Present", type:"Part-Time", role:"AI Center & DX Lab Coordinator", co:"Barry University", pts:["Manage operations of university AI, robotics, and emerging technology labs","Support faculty and students in deploying ML tools and optimizing hardware/software workflows","Lead live demonstrations of ML models and XR systems; onboard new student researchers","Coordinate interdisciplinary project logistics across AI, robotics, and data science teams"] },
            { when:"May – Aug 2024", type:"Remote Internship", role:"Software Engineer Intern", co:"BeStudios", pts:["Built and optimized Java-based backend modules for client-facing production applications","Improved runtime performance and scalability by 25% through architectural refactoring","Collaborated with cross-functional teams in agile sprints to deliver client-ready features","Participated in code reviews, technical design sessions, and requirements analysis"] },
          ].map((item, i) => (
            <FadeIn key={item.role} delay={i * 0.12}>
              <div className="tl-item">
                <div className="tl-dot" />
                <div className="tl-when">{item.when}<span className="tl-badge">{item.type}</span></div>
                <div className="tl-role">{item.role}</div>
                <div className="tl-co">{item.co}</div>
                <ul className="tl-pts">{item.pts.map(p => <li key={p.slice(0,30)}>{p}</li>)}</ul>
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
        <div className="sec-lbl">Research</div>
        <h2 className="sec-h">Academic Research</h2>
        <p className="sec-sub">Undergraduate research accepted at national symposia — methods directly applicable to cybersecurity anomaly detection.</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="res-wrap">
          <div className="res-pills">
            {["✓ CURO Symposium 2026 — University of Georgia","✓ Barry STEM Symposium 2026"].map(p => <span key={p} className="res-pill">{p.slice(2)}</span>)}
          </div>
          <div className="res-title">Multi-Model Framework for Forecasting &amp; Clustering Financial Assets</div>
          <div className="res-super">Supervised by Prof. James Haralambides · Barry University · 2024 – 2026</div>
          <ul className="res-pts">
            {[
              "Designed a unified ML framework comparing classical and deep learning models (Ridge, Random Forest, MLP, CNN, LSTM) across multi-asset financial time-series datasets.",
              "Conducted rolling-window and out-of-sample experiments to evaluate model stability under distribution shift in non-stationary environments.",
              "Found classical models frequently outperformed deep architectures during regime changes — this finding maps directly onto cybersecurity anomaly detection under behavioral drift.",
              "Applied unsupervised learning methods (PCA, NMF, t-SNE) to analyze structural clustering across asset classes.",
              "Extracted transferable insights for adaptive security systems: the drift-aware evaluation framework applies to network intrusion detection under evolving threat landscapes.",
            ].map(b => <li key={b.slice(0,40)}>{b}</li>)}
          </ul>
          <div className="tags">
            {["Python","TensorFlow","scikit-learn","NumPy","Pandas","LSTM","CNN","PCA","t-SNE","Matplotlib"].map(t => <span key={t} className="tag tag-c">{t}</span>)}
          </div>
          <div style={{ marginTop: 20 }}>
            <a href="https://github.com/aftabalam01-creator/Stock-Forecasting-ML-AftabAlamMasjidi" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", color: "var(--cyan)", fontWeight: 700 }}>
              Open Repository ↗
            </a>
          </div>
          <Accordion text={RESEARCH_STATEMENT} />
        </div>
      </FadeIn>
      <FadeIn delay={0.18} style={{ marginTop: 24 }}>
        <div style={{ marginTop: 24 }} className="card card-p">
          <h3 style={{ fontSize: "0.98rem", fontWeight: 800, marginBottom: 8 }}>Next Research Phase: Predictive Cyber Threat Detection</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: 14 }}>
            Applying temporal deep learning (CNN-LSTM, Transformers) to network telemetry for proactive intrusion detection, with Bayesian uncertainty quantification and SHAP-based explainability — designed for real-world SOC deployment. Directly aligned with Aalborg MSc research focus.
          </p>
          <div className="tags">
            {["Intrusion Detection","CNN-LSTM","Transformers","Bayesian Inference","SHAP/LIME","SOC","IoT Security","MLOps"].map(t => <span key={t} className="tag tag-p">{t}</span>)}
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
        <div className="sec-lbl">Projects</div>
        <h2 className="sec-h">Technical Portfolio</h2>
        <p className="sec-sub">Full-stack security systems, ML research implementations, and network engineering — all built from scratch.</p>
      </FadeIn>
      <div className="g3">
        {[
          {
            title: "Secure Multi-Role Web Portal",
            sub: "Java EE · Security Engineering · Full-Stack",
            pts: ["MVC architecture with Java EE (Servlets/JSP) and normalized MySQL schema","RBAC for three user tiers with industry-standard BCrypt password hashing","Database-driven CMS with full event-logging module for system auditing","Deployed on Apache Tomcat with complete session management"],
            tech: [["Java EE","c"],["JSP/Servlets","c"],["MySQL","g"],["BCrypt","g"],["RBAC","p"],["MVC","p"]],
            media: "video",
          },
          {
            title: "ML Financial Forecasting System",
            sub: "Python · TensorFlow · Research Implementation",
            pts: ["CNN-LSTM hybrid for multi-asset financial time-series prediction","Rolling-window backtesting with regime-change stress testing","Comparative study of 5 model families — methodology maps to threat detection","Accepted for presentation at CURO Symposium 2026 (UGA)"],
            tech: [["Python","c"],["TensorFlow","c"],["LSTM","g"],["CNN","g"],["scikit-learn","p"],["Pandas","p"]],
            media: "gif",
            gh: "https://github.com/aftabalam01-creator/Stock-Forecasting-ML-AftabAlamMasjidi",
          },
          {
            title: "CRC Data Integrity Analyzer",
            sub: "Java · Network Security · Protocol Engineering",
            pts: ["Java GUI implementing CRC with selectable polynomials for error detection","Packetizes binary data with integrity verification testing module","Deep packet inspection using Wireshark across full TCP/IP stack","Analysis of HTTP, DNS, TCP, UDP with netstat/tracert/nslookup"],
            tech: [["Java","c"],["Wireshark","g"],["CRC","g"],["TCP/IP","p"],["GUI","c"],["netstat","p"]],
            media: "none",
          },
        ].map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="proj">
              <div className="proj-media">
                {p.media === "video" && <video src="/files/SWEProject.mp4" controls muted />}
                {p.media === "gif"   && <img src="/files/ML%20Stock%20Prediction.gif" alt={p.title} />}
                {p.media === "none"  && <div className="proj-placeholder"><div className="proj-placeholder-icon">🔐</div><span>Network Security Project</span></div>}
              </div>
              <div className="proj-body">
                <div className="proj-title">{p.title}</div>
                <div className="proj-sub">{p.sub}</div>
                <ul className="proj-pts">{p.pts.map(b => <li key={b.slice(0,30)}>{b}</li>)}</ul>
                <div className="tags">{p.tech.map(([t,v]) => <span key={t} className={`tag tag-${v}`}>{t}</span>)}</div>
                {p.gh && <div style={{ marginTop: 10 }}><a href={p.gh} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.77rem", color:"var(--cyan)", fontWeight:700 }}>GitHub ↗</a></div>}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="skills-section">
    <div className="w">
      <FadeIn>
        <div className="sec-lbl">Skills</div>
        <h2 className="sec-h">Technical Proficiency</h2>
        <p className="sec-sub">Measured across languages, security domains, AI/ML, and mathematics.</p>
      </FadeIn>
      <div className="g2">
        <FadeIn delay={0.08}>
          <div className="card card-c">
            <div className="skill-group-title">Core Languages</div>
            {[["Python",95],["Java",90],["SQL",85],["JavaScript",78],["HTML5/CSS3",80]].map(([n,p]) => <SkillBar key={n} name={n} pct={p} color="var(--cyan)" />)}
          </div>
        </FadeIn>
        <FadeIn delay={0.14}>
          <div className="card card-g">
            <div className="skill-group-title">AI &amp; Machine Learning</div>
            {[["PyTorch / TensorFlow",90],["scikit-learn",92],["NLP & Transformers",80],["CNN / LSTM",88],["Data Analysis (NumPy/Pandas)",93]].map(([n,p]) => <SkillBar key={n} name={n} pct={p} color="var(--green)" />)}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="card card-p">
            <div className="skill-group-title">Cybersecurity</div>
            {[["Network Analysis / Wireshark",86],["Threat Modeling & RBAC",83],["Cryptography / BCrypt",82],["Computer Forensics (NTFS/MFT)",78],["Packet Inspection / TCP-IP",85]].map(([n,p]) => <SkillBar key={n} name={n} pct={p} color="var(--purple)" />)}
          </div>
        </FadeIn>
        <FadeIn delay={0.26}>
          <div className="card card-gold">
            <div className="skill-group-title">Mathematics</div>
            {[["Probability & Statistics",90],["Linear Algebra",88],["Discrete Mathematics",92],["Calculus",80]].map(([n,p]) => <SkillBar key={n} name={n} pct={p} color="var(--gold)" />)}
            <div style={{ marginTop: 20 }}>
              <div className="skill-group-title" style={{ marginBottom: 12 }}>Tools &amp; Platforms</div>
              <div className="tags">
                {["Git/GitHub","Linux","Eclipse IDE","VS Code","Jupyter","Apache Tomcat","Microsoft Azure","React.js","Vite","Framer Motion"].map(t => <span key={t} className="tag tag-c">{t}</span>)}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section id="leadership">
    <div className="w">
      <FadeIn>
        <div className="sec-lbl">Leadership</div>
        <h2 className="sec-h">Community &amp; Impact</h2>
        <p className="sec-sub">Founded and led organizations demonstrating initiative, communication, and ability to build communities from zero.</p>
      </FadeIn>
      <div className="g2">
        <FadeIn delay={0.08}>
          <div className="card">
            <div style={{ fontSize:"0.68rem", fontWeight:800, color:"var(--cyan)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:20 }}>// Founder Roles</div>
            {[
              { when:"Sept 2025 – Present", role:"Founder & President", org:"AI Club @ Barry University", detail:"Founded and lead active student community exploring AI, ML, and Data Analytics. Organize workshops, hackathons, and guest talks; collaborate with the DX Lab and AI Center." },
              { when:"Jan 2024 – Present",  role:"Founder & President", org:"Muslim Students Association", detail:"Founded 50+ member community; coordinate campus-wide educational and cultural events; build cross-cultural partnerships across university departments." },
            ].map((l, i) => <div key={l.org} className="ldr-item" style={i===0?{paddingTop:0}:{}}><div className="ldr-when">{l.when}</div><div><div className="ldr-role">{l.role}</div><div className="ldr-org">{l.org}</div><div className="ldr-detail">{l.detail}</div></div></div>)}
          </div>
        </FadeIn>
        <FadeIn delay={0.16}>
          <div className="card">
            <div style={{ fontSize:"0.68rem", fontWeight:800, color:"var(--green)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:20 }}>// Analyst &amp; Director Roles</div>
            {[
              { when:"Sept 2024 – Jan 2025", role:"Co-Managing Analyst", org:"Student Managed Investment Fund", detail:"Performed financial and technical valuation for tech-sector holdings; applied ML techniques to analyze market trends and inform investment strategy." },
              { when:"2024 – 2025",          role:"Co-Managing Director", org:"FinFit Thursday Initiative", detail:"Conducted financial literacy and data-driven decision-making workshops for local high school students across Miami." },
            ].map((l, i) => <div key={l.org} className="ldr-item" style={i===0?{paddingTop:0}:{}}><div className="ldr-when">{l.when}</div><div><div className="ldr-role">{l.role}</div><div className="ldr-org">{l.org}</div><div className="ldr-detail">{l.detail}</div></div></div>)}
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize:"0.68rem", fontWeight:800, color:"var(--gold)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:18 }}>// Awards &amp; Recognition</div>
          <div className="awards-grid">
            {[
              { name:"Summa Cum Laude",              desc:"Highest academic distinction — Barry University Class of 2026",        c:"#f5c518" },
              { name:"Stamps Scholar",               desc:"Full-ride merit scholarship · top 0.5% of applicants nationally",      c:"#00e87a" },
              { name:"President's List · 5×",        desc:"Exceptional academic performance across five consecutive semesters",    c:"#00c8ff" },
              { name:"Dean's List 2024",              desc:"Outstanding academic achievement — Spring 2024",                        c:"#00c8ff" },
              { name:"Outstanding Performance 2024", desc:"Recognized for innovation, leadership, and excellence in role",         c:"#9b5de5" },
              { name:"Dr. George Wanko Nominee",     desc:"Nominated for Outstanding Junior of the Year, Barry University",       c:"#ff6b35" },
              { name:"CURO Symposium 2026",          desc:"Accepted — University of Georgia competitive research symposium",       c:"#00e87a" },
              { name:"Barry STEM Symposium 2026",    desc:"Research presentation accepted — university-wide STEM symposium",      c:"#00c8ff" },
            ].map(a => (
              <div key={a.name} className="award">
                <div className="award-dot" style={{ background: a.c, boxShadow: `0 0 8px ${a.c}60` }} />
                <div><div className="award-name">{a.name}</div><div className="award-desc">{a.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const AcademicRecord = () => {
  const data = {
    labels: Object.keys(SEMESTER_COURSES),
    datasets: [
      { label:"Semester GPA", data:[4.0,4.0,4.0,3.867,4.0,4.0], borderColor:"rgba(0,200,255,0.9)", backgroundColor:"rgba(0,200,255,0.1)", pointBackgroundColor:"#00e87a", pointBorderColor:"#00e87a", pointRadius:6, pointHoverRadius:9, tension:0.35, fill:true, borderWidth:2 },
      { label:"Cumulative GPA", data:[4.0,4.0,4.0,3.961,3.968,4.0], borderColor:"rgba(0,232,122,0.8)", borderDash:[5,4], pointBackgroundColor:"#00c8ff", pointRadius:4, tension:0.35, fill:false, borderWidth:2 },
    ],
  };
  const opts = {
    plugins: {
      legend: { display:true, labels:{ color:"#5a7a96", font:{ size:12 }, boxWidth:18, padding:16 } },
      tooltip: {
        backgroundColor:"rgba(3,5,8,0.97)", borderColor:"rgba(0,200,255,0.3)", borderWidth:1,
        titleColor:"#00e87a", bodyColor:"#ddeeff", padding:14, displayColors:false,
        callbacks: {
          label:(ctx) => {
            if (ctx.dataset.label !== "Semester GPA") return `Cumulative GPA: ${ctx.parsed.y.toFixed(3)}`;
            const courses = SEMESTER_COURSES[ctx.label] || [];
            return [`Term GPA: ${ctx.parsed.y.toFixed(3)}`, "────────────────────────", ...courses.map(([c,n,g]) => `${c}  ${n} — ${g}`)];
          },
        },
      },
    },
    scales: {
      y: { min:3.5, max:4.01, ticks:{ color:"#5a7a96", font:{ size:11 } }, grid:{ color:"rgba(255,255,255,0.04)" } },
      x: { ticks:{ color:"#5a7a96", font:{ size:11 } }, grid:{ color:"rgba(255,255,255,0.04)" } },
    },
  };
  return (
    <section id="courses" style={{ background: "var(--s1)" }}>
      <div className="w">
        <FadeIn>
          <div className="sec-lbl">Academics</div>
          <h2 className="sec-h">GPA Trajectory &amp; Course Record</h2>
          <p className="sec-sub">Hover a semester point to view individual courses and grades. Full transcript available on request.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="card">
            <div className="chart-wrap">
              <div style={{ fontSize:"0.88rem", fontWeight:800, color:"var(--cyan)", marginBottom:6 }}>Semester vs. Cumulative GPA — 2022 → 2026</div>
              <div style={{ fontSize:"0.74rem", color:"var(--muted)", marginBottom:20 }}>
                Hover <span style={{color:"var(--green)",fontWeight:700}}>Semester GPA</span> points to see courses &amp; grades
              </div>
              <Line data={data} options={opts} />
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
        <div className="sec-lbl">Publications</div>
        <h2 className="sec-h">Academic Papers</h2>
        <p className="sec-sub">Course papers and technical reports covering cryptography, algorithms, and biometrics.</p>
      </FadeIn>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { title:"Hash Functions in Discrete Mathematics", notes:"Survey and implementation; collision properties; cryptographic vs. non-cryptographic trade-offs; security applications.", link:"/files/Aftab%20Alam%20-%20Hash%20Functions%20in%20Discrete%20Mathematics.pdf" },
          { title:"Minimum Spanning Tree & Prim's Algorithm", notes:"Graph theory primer; proof sketch and complexity analysis; code implementation; network topology applications.", link:"/files/Aftab%20Alam%20-%20Minimal%20Spanning%20Tree%20and%20Prim%E2%80%99s%20Algorithm.pdf" },
          { title:"Biometrics — Selected Analyses", notes:"Ethical, AI-driven, and privacy-focused analyses; alignment with GDPR and privacy-by-design principles.", link:"/files/BiOMETRICSS.pdf" },
        ].map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="paper">
              <div className="paper-n">0{i + 1}</div>
              <div>
                <div className="paper-title">{p.title}</div>
                <div className="paper-notes">{p.notes}</div>
                <a className="paper-link" href={p.link} target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
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
        <div className="sec-lbl">LinkedIn</div>
        <h2 className="sec-h">Latest Posts</h2>
        <p className="sec-sub">Research updates and academic milestones shared publicly.</p>
      </FadeIn>
      <div className="g2">
        {[
          { href:"https://www.linkedin.com/posts/aftabalammasjidi_ai-machinelearning-deeplearning-activity-7388522435047862273-bXu5", img:"/files/LinkedInPost1.PNG", title:"AI × Deep Learning Research Update", desc:"Comparative study of ML and DL architectures for predictive analytics — translating financial models to security applications." },
          { href:"https://www.linkedin.com/posts/aftabalammasjidi_barryuniversity-aicenter-stampsscholar-activity-7387710789618466817-RWae", img:"/files/LinkedInPost2.PNG", title:"Barry University AI Center & Stamps Scholar", desc:"Updates on AI center leadership, active student projects, and academic milestones as Stamps Scholar." },
        ].map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <a className="feed-card" href={p.href} target="_blank" rel="noopener noreferrer">
              <img src={p.img} alt={p.title} />
              <div className="feed-body">
                <div className="feed-title">{p.title}</div>
                <div className="feed-desc">{p.desc}</div>
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
        <div className="cta-box">
          <div className="sec-lbl" style={{ justifyContent:"center", marginBottom:12 }}>Contact</div>
          <h2>Let's Build Something Secure</h2>
          <p>
            Actively seeking cybersecurity roles in Europe — student assistantships at universities and full-time positions at security, tech, or research organizations. Relocating to Copenhagen for my MSc in September 2026. Open to remote and hybrid roles across the EU.
          </p>
          <div className="cta-links">
            {[
              { h:"mailto:aftabalam.masjidi@mymail.barry.edu", l:"✉ Email Me",       p:true },
              { h:"https://www.linkedin.com/in/aftabalammasjidi", l:"LinkedIn ↗",   p:true },
              { h:"/files/AftabAlamMasjidi_CV.pdf", l:"↓ Download CV",              p:true },
              { h:"https://github.com/aftabalam01-creator", l:"GitHub ↗",           p:false },
            ].map(({ h, l, p }) => (
              <a key={h} href={h} target={h.startsWith("mailto") ? undefined : "_blank"} rel={h.startsWith("mailto") ? undefined : "noopener noreferrer"} className={`hbtn ${p ? "hbtn-p" : "hbtn-s"}`}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ fontSize:"0.78rem", color:"var(--muted)", marginBottom:32 }}>
            📍 Miami, FL → Copenhagen, Denmark (Sept 2026) &nbsp;·&nbsp; 📞 +1 (786) 210-7596
          </div>
          <div style={{ fontSize:"0.68rem", fontWeight:800, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:14 }}>
            // Documents
          </div>
          <div className="docs-row">
            {[
              ["/files/AftabAlamMasjidi_CV.pdf","Academic CV"],
              ["/files/AftabBarryUniversityTranscript.pdf","Official Transcript"],
              ["/files/AftabSOPMBZUAI.pdf","Statement of Purpose"],
              ["/files/Nominations.pdf","Nomination Letters"],
              ["/files/2025 Dr. George Wanko Award for Outstanding Junior Nomination - Aftab Alam Masjidi.pdf","Wanko Award Nomination"],
            ].map(([h, l]) => (
              <a key={h} className="doc-link" href={h} target="_blank" rel="noopener noreferrer">📄 {l}</a>
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
          <div className="footer-brand">aftab@portfolio ~ cybersecurity &amp; AI</div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Aftab Alam Masjidi · Barry University Alumnus (Summa Cum Laude) · Incoming M.Sc. Cybersecurity, Aalborg University Copenhagen
          </div>
          <div style={{ marginTop:10, fontSize:"0.7rem", color:"rgba(90,122,150,0.45)", fontFamily:"'JetBrains Mono',monospace" }}>
            aftabalam.masjidi@mymail.barry.edu · linkedin.com/in/aftabalammasjidi · github.com/aftabalam01-creator
          </div>
        </div>
      </footer>
    </>
  );
}
