<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5">
    <title>Microdose Studio - Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f7fb;
            color: #1a1a2e;
            padding: 20px;
        }

        /* ========== LAYOUT ========== */
        .app {
            max-width: 1440px;
            margin: 0 auto;
        }

        /* ========== HEADER / SIDEBAR ========== */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid #e8ecf1;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 12px;
        }

        .logo-area {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #6c5ce7, #a29bfe);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 16px;
        }

        .logo-text {
            font-weight: 700;
            font-size: 20px;
            letter-spacing: -0.5px;
        }
        .logo-text span {
            color: #6c5ce7;
        }

        .header-nav {
            display: flex;
            align-items: center;
            gap: 28px;
            flex-wrap: wrap;
        }

        .header-nav a {
            text-decoration: none;
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
            transition: 0.2s;
            padding: 6px 0;
            border-bottom: 2px solid transparent;
        }

        .header-nav a:hover,
        .header-nav a.active {
            color: #1a1a2e;
            border-bottom-color: #6c5ce7;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: linear-gradient(135deg, #fd79a8, #e17055);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
        }

        /* ========== DASHBOARD GRID ========== */
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 28px;
        }

        /* ========== MAIN CONTENT ========== */
        .main-content {
            display: flex;
            flex-direction: column;
            gap: 28px;
        }

        /* Welcome Section */
        .welcome {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 12px;
        }

        .welcome h1 {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .welcome h1 small {
            font-weight: 400;
            font-size: 16px;
            color: #6b7280;
            display: block;
            margin-top: 4px;
        }

        .welcome-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 13px;
            border: none;
            cursor: pointer;
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-primary {
            background: #6c5ce7;
            color: white;
        }
        .btn-primary:hover {
            background: #5a4bd1;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
        }

        .btn-outline {
            background: transparent;
            color: #6b7280;
            border: 1.5px solid #e8ecf1;
        }
        .btn-outline:hover {
            background: #f5f7fb;
            border-color: #6c5ce7;
        }

        /* ========== STATS CARDS ========== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }

        .stat-card {
            background: white;
            border-radius: 16px;
            padding: 18px 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            border: 1px solid #edf0f5;
            transition: 0.2s;
        }
        .stat-card:hover {
            border-color: #6c5ce7;
            box-shadow: 0 4px 16px rgba(108, 92, 231, 0.08);
        }

        .stat-label {
            font-size: 13px;
            color: #6b7280;
            font-weight: 500;
        }

        .stat-number {
            font-size: 28px;
            font-weight: 700;
            margin-top: 4px;
            letter-spacing: -0.5px;
        }

        .stat-sub {
            font-size: 12px;
            color: #6b7280;
            margin-top: 4px;
        }

        .stat-number.purple { color: #6c5ce7; }
        .stat-number.blue { color: #0984e3; }
        .stat-number.green { color: #00b894; }
        .stat-number.orange { color: #fdcb6e; }
        .stat-number.red { color: #e17055; }

        /* ========== TASK STATUS ========== */
        .task-status-section {
            background: white;
            border-radius: 16px;
            padding: 22px 24px;
            border: 1px solid #edf0f5;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 8px;
        }

        .section-header h3 {
            font-size: 16px;
            font-weight: 600;
        }

        .section-header .sub {
            font-size: 13px;
            color: #6b7280;
            font-weight: 400;
        }

        .task-status-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }

        .task-status-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 14px 8px;
            background: #f8f9fc;
            border-radius: 12px;
            border: 1px solid #edf0f5;
        }

        .task-status-item .number {
            font-size: 24px;
            font-weight: 700;
        }
        .task-status-item .label {
            font-size: 13px;
            color: #6b7280;
            margin-top: 2px;
        }

        /* ========== CHART / BURNDOWN ========== */
        .chart-section {
            background: white;
            border-radius: 16px;
            padding: 22px 24px;
            border: 1px solid #edf0f5;
        }

        .chart-container {
            display: flex;
            align-items: flex-end;
            gap: 8px;
            height: 140px;
            padding-top: 12px;
            margin-top: 8px;
        }

        .chart-bar {
            flex: 1;
            background: linear-gradient(180deg, #6c5ce7, #a29bfe);
            border-radius: 6px 6px 0 0;
            min-height: 8px;
            transition: 0.3s;
            position: relative;
        }

        .chart-bar .val {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            font-weight: 600;
            color: #6b7280;
        }

        .chart-labels {
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }

        .chart-labels span {
            flex: 1;
            text-align: center;
            font-size: 11px;
            color: #6b7280;
        }

        /* ========== SIDEBAR ========== */
        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .sidebar-card {
            background: white;
            border-radius: 16px;
            padding: 20px 22px;
            border: 1px solid #edf0f5;
        }

        .sidebar-card h4 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 14px;
        }

        .sidebar-card .comment-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid #f0f2f6;
            font-size: 13px;
        }

        .sidebar-card .comment-item:last-child {
            border-bottom: none;
        }

        .comment-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #dfe6e9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 12px;
            color: #2d3436;
            flex-shrink: 0;
        }

        .comment-text {
            flex: 1;
        }
        .comment-text .name {
            font-weight: 500;
            font-size: 13px;
        }
        .comment-text .time {
            font-size: 11px;
            color: #6b7280;
        }

        .comment-count {
            font-size: 20px;
            font-weight: 700;
            color: #6c5ce7;
        }

        /* ========== TASK LIST (Bottom) ========== */
        .task-list-section {
            background: white;
            border-radius: 16px;
            padding: 22px 24px;
            border: 1px solid #edf0f5;
            margin-top: 8px;
            overflow-x: auto;
        }

        .task-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            min-width: 600px;
        }

        .task-table th {
            text-align: left;
            padding: 10px 12px;
            color: #6b7280;
            font-weight: 500;
            border-bottom: 2px solid #edf0f5;
        }

        .task-table td {
            padding: 12px 12px;
            border-bottom: 1px solid #f0f2f6;
            vertical-align: middle;
        }

        .task-table tr:hover td {
            background: #fafbfc;
        }

        .task-tag {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }

        .task-tag.urgent { background: #ffeaa7; color: #6d4c00; }
        .task-tag.normal { background: #dfe6e9; color: #2d3436; }
        .task-tag.low { background: #dfe6e9; color: #6b7280; }
        .task-tag.high { background: #ff7675; color: white; }

        .task-priority {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .task-priority .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }
        .task-priority .dot.urgent { background: #fdcb6e; }
        .task-priority .dot.normal { background: #0984e3; }
        .task-priority .dot.low { background: #00b894; }

        .task-progress {
            width: 80px;
            height: 6px;
            background: #edf0f5;
            border-radius: 4px;
            overflow: hidden;
        }

        .task-progress .fill {
            height: 100%;
            border-radius: 4px;
            background: #6c5ce7;
        }

        .task-progress .fill.green { background: #00b894; }
        .task-progress .fill.orange { background: #fdcb6e; }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1200px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
            .sidebar {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 992px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .task-status-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .sidebar {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            body { padding: 12px; }
            .header { flex-direction: column; align-items: stretch; gap: 12px; }
            .header-nav { justify-content: center; gap: 16px; }
            .header-actions { justify-content: center; }
            .welcome h1 { font-size: 20px; }
            .stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
            .stat-card { padding: 14px 16px; }
            .stat-number { font-size: 22px; }
            .task-status-grid { grid-template-columns: 1fr 1fr; }
            .chart-container { height: 100px; }
            .task-list-section { padding: 16px; }
        }

        @media (max-width: 480px) {
            .stats-grid { grid-template-columns: 1fr; }
            .task-status-grid { grid-template-columns: 1fr 1fr; }
            .header-nav a { font-size: 12px; }
            .welcome-actions .btn { padding: 8px 14px; font-size: 12px; }
            .task-table { font-size: 12px; min-width: 500px; }
            .sidebar-card { padding: 14px 16px; }
        }

        /* ========== SCROLLBAR ========== */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f0f2f6;
            border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb {
            background: #d0d5dd;
            border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #b0b5bd;
        }
    </style>
</head>
<body>
    <div class="app">

        <!-- ====== HEADER ====== -->
        <header class="header">
            <div class="logo-area">
                <div class="logo-icon">M</div>
                <div class="logo-text">microdose.<span>studio</span></div>
            </div>

            <nav class="header-nav">
                <a href="#" class="active">Overview</a>
                <a href="#">Dashboard</a>
                <a href="#">Calendar</a>
                <a href="#">Tasks</a>
            </nav>

            <div class="header-actions">
                <button class="btn btn-outline" style="padding:8px 16px; font-size:13px;">Invite</button>
                <div class="avatar">JD</div>
            </div>
        </header>

        <!-- ====== DASHBOARD ====== -->
        <div class="dashboard">

            <!-- ====== MAIN ====== -->
            <div class="main-content">

                <!-- Welcome -->
                <div class="welcome">
                    <div>
                        <h1>
                            Tasks report
                            <small>Stay on top of your tasks, monitor progress, and track status.</small>
                        </h1>
                    </div>
                    <div class="welcome-actions">
                        <button class="btn btn-outline">📊 Filters</button>
                        <button class="btn btn-primary">+ New Task</button>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">📋 Backlog</div>
                        <div class="stat-number purple">24</div>
                        <div class="stat-sub">+3 this week</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">⚡ In Progress</div>
                        <div class="stat-number blue">4</div>
                        <div class="stat-sub">2 are urgent</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">✅ Validation</div>
                        <div class="stat-number green">7</div>
                        <div class="stat-sub">3 pending review</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">🎯 Done</div>
                        <div class="stat-number orange">13</div>
                        <div class="stat-sub">+5 this month</div>
                    </div>
                </div>

                <!-- Task Status -->
                <div class="task-status-section">
                    <div class="section-header">
                        <h3>Task status <span class="sub">· 48 total</span></h3>
                        <span style="font-size:13px; color:#6b7280;">📅 This sprint</span>
                    </div>
                    <div class="task-status-grid">
                        <div class="task-status-item">
                            <div class="number" style="color:#6c5ce7;">24</div>
                            <div class="label">Backlog</div>
                        </div>
                        <div class="task-status-item">
                            <div class="number" style="color:#0984e3;">4</div>
                            <div class="label">In Progress</div>
                        </div>
                        <div class="task-status-item">
                            <div class="number" style="color:#00b894;">7</div>
                            <div class="label">Validation</div>
                        </div>
                        <div class="task-status-item">
                            <div class="number" style="color:#fdcb6e;">13</div>
                            <div class="label">Done</div>
                        </div>
                    </div>
                </div>

                <!-- Chart -->
                <div class="chart-section">
                    <div class="section-header">
                        <h3>Burndown chart <span class="sub">· estimate points</span></h3>
                        <span style="font-size:13px; color:#6b7280;">📈 27 commits · 2.9% (7d)</span>
                    </div>
                    <div class="chart-container">
                        <div class="chart-bar" style="height:80%;"><span class="val">120</span></div>
                        <div class="chart-bar" style="height:70%;"><span class="val">100</span></div>
                        <div class="chart-bar" style="height:60%;"><span class="val">85</span></div>
                        <div class="chart-bar" style="height:45%;"><span class="val">65</span></div>
                        <div class="chart-bar" style="height:30%;"><span class="val">40</span></div>
                        <div class="chart-bar" style="height:20%;"><span class="val">25</span></div>
                        <div class="chart-bar" style="height:10%;"><span class="val">10</span></div>
                    </div>
                    <div class="chart-labels">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                        <span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <!-- Task Table -->
                <div class="task-list-section">
                    <div class="section-header">
                        <h3>Active tasks <span class="sub">· 8 tasks</span></h3>
                        <div style="display:flex; gap:10px; flex-wrap:wrap;">
                            <button class="btn btn-outline" style="padding:4px 14px; font-size:12px;">Backlog</button>
                            <button class="btn btn-outline" style="padding:4px 14px; font-size:12px;">Calendar</button>
                            <button class="btn btn-outline" style="padding:4px 14px; font-size:12px;">Timeline</button>
                        </div>
                    </div>

                    <table class="task-table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Due</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>MDS-39</strong><br><span style="font-size:12px; color:#6b7280;">New microdose website</span></td>
                                <td><span class="task-tag urgent">Urgent</span></td>
                                <td><span style="color:#0984e3;">● In Progress</span></td>
                                <td>July 29, '24</td>
                                <td><div class="task-progress"><div class="fill" style="width:65%;"></div></div></td>
                            </tr>
                            <tr>
                                <td><strong>MDS-56</strong><br><span style="font-size:12px; color:#6b7280;">Input Styleguide</span></td>
                                <td><span class="task-tag normal">Normal</span></td>
                                <td><span style="color:#00b894;">● Validation</span></td>
                                <td>June 2, '24</td>
                                <td><div class="task-progress"><div class="fill green" style="width:90%;"></div></div></td>
                            </tr>
                            <tr>
                                <td><strong>MDS-1</strong><br><span style="font-size:12px; color:#6b7280;">Case studies - Fin Tech</span></td>
                                <td><span class="task-tag urgent">Urgent</span></td>
                                <td><span style="color:#fdcb6e;">● Backlog</span></td>
                                <td>Sep 21, '24</td>
                                <td><div class="task-progress"><div class="fill orange" style="width:20%;"></div></div></td>
                            </tr>
                            <tr>
                                <td><strong>MDS-43</strong><br><span style="font-size:12px; color:#6b7280;">Spline animated logo</span></td>
                                <td><span class="task-tag low">Low</span></td>
                                <td><span style="color:#6b7280;">● Backlog</span></td>
                                <td>July 13, '24</td>
                                <td><div class="task-progress"><div class="fill" style="width:10%;"></div></div></td>
                            </tr>
                            <tr>
                                <td><strong>MDS-12</strong><br><span style="font-size:12px; color:#6b7280;">Demo reel - Animation</span></td>
                                <td><span class="task-tag normal">Normal</span></td>
                                <td><span style="color:#0984e3;">● In Progress</span></td>
                                <td>Aug 2, '24</td>
                                <td><div class="task-progress"><div class="fill" style="width:45%;"></div></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ====== SIDEBAR ====== -->
            <div class="sidebar">

                <!-- Comments -->
                <div class="sidebar-card">
                    <h4>💬 Comments <span style="font-weight:400; color:#6b7280; font-size:13px;">· 109 total</span></h4>
                    <div class="comment-item">
                        <div class="comment-avatar" style="background:#dfe6e9;">JD</div>
                        <div class="comment-text">
                            <div class="name">John Doe</div>
                            <div class="time">Just now · "Looks great!"</div>
                        </div>
                    </div>
                    <div class="comment-item">
                        <div class="comment-avatar" style="background:#fd79a8; color:white;">SM</div>
                        <div class="comment-text">
                            <div class="name">Sarah Miller</div>
                            <div class="time">2 min ago · "Need revision on hero"</div>
                        </div>
                    </div>
                    <div class="comment-item">
                        <div class="comment-avatar" style="background:#0984e3; color:white;">AK</div>
                        <div class="comment-text">
                            <div class="name">Alex Kim</div>
                            <div class="time">15 min ago · "Approved!"</div>
                        </div>
                    </div>
                    <div style="margin-top:10px; text-align:center; font-size:13px; color:#6c5ce7; cursor:pointer;">View all 109 comments →</div>
                </div>

                <!-- Metrics -->
                <div class="sidebar-card">
                    <h4>📊 Metrics <span style="font-weight:400; color:#6b7280; font-size:13px;">· Active</span></h4>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f2f6;">
                        <span style="color:#6b7280;">Commits</span>
                        <span style="font-weight:600;">27</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f2f6;">
                        <span style="color:#6b7280;">PRs Open</span>
                        <span style="font-weight:600;">8</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f2f6;">
                        <span style="color:#6b7280;">Reviewers</span>
                        <span style="font-weight:600;">4</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0;">
                        <span style="color:#6b7280;">Velocity</span>
                        <span style="font-weight:600; color:#00b894;">+2.9%</span>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="sidebar-card">
                    <h4>⚡ Quick stats</h4>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f2f6;">
                        <span style="color:#6b7280;">In Progress</span>
                        <span style="font-weight:600; color:#0984e3;">4</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f2f6;">
                        <span style="color:#6b7280;">Validation</span>
                        <span style="font-weight:600; color:#00b894;">7</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:6px 0;">
                        <span style="color:#6b7280;">Done this week</span>
                        <span style="font-weight:600; color:#fdcb6e;">+5</span>
                    </div>
                </div>

                <!-- Help -->
                <div class="sidebar-card" style="border-color:#6c5ce7; background:#f8f6ff;">
                    <h4 style="color:#6c5ce7;">🆘 Help Center</h4>
                    <p style="font-size:13px; color:#6b7280; margin-bottom:10px;">Need help? Check our docs or invite your team.</p>
                    <button class="btn btn-primary" style="width:100%; justify-content:center; font-size:13px;">Invite teams</button>
                    <button class="btn btn-outline" style="width:100%; justify-content:center; margin-top:8px; font-size:13px;">⚙️ Settings</button>
                </div>

            </div>
        </div>

    </div>

    <script>
        // Optional: hover effect chart bars
        document.querySelectorAll('.chart-bar').forEach(bar => {
            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
            });
            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
        });
    </script>
</body>
</html>
