// IT Audit Management System - Client-Side Application
class AuditManagementSystem {
    constructor() {
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        this.initializeData();
        this.setupEventListeners();
        this.checkAuthentication();
    }

    // Initialize sample data if not exists
    initializeData() {
        if (!localStorage.getItem('auditSystem_initialized')) {
            this.createSampleData();
            localStorage.setItem('auditSystem_initialized', 'true');
        }
    }

    createSampleData() {
        // Sample Users
        const users = [
            {
                id: 'user1',
                email: 'admin@company.com',
                password: 'admin123',
                firstName: 'System',
                lastName: 'Administrator',
                role: 'admin',
                permissions: ['all']
            },
            {
                id: 'user2',
                email: 'manager@company.com',
                password: 'manager123',
                firstName: 'John',
                lastName: 'Manager',
                role: 'audit_manager',
                permissions: ['manage_audits', 'create_audit', 'view_reports']
            },
            {
                id: 'user3',
                email: 'auditor@company.com',
                password: 'auditor123',
                firstName: 'Jane',
                lastName: 'Auditor',
                role: 'auditor',
                permissions: ['view_audits', 'manage_tasks']
            }
        ];

        // Sample Audits
        const audits = [
            {
                id: 'audit1',
                title: 'Q4 2024 SOX Compliance Audit',
                description: 'Quarterly Sarbanes-Oxley compliance assessment focusing on financial reporting controls',
                type: 'compliance',
                status: 'in_progress',
                priority: 'high',
                leadAuditor: 'user2',
                startDate: '2024-12-01',
                endDate: '2024-12-31',
                progress: 65,
                createdAt: new Date('2024-12-01').toISOString(),
                findings: [
                    {
                        id: 'finding1',
                        title: 'Inadequate Segregation of Duties',
                        description: 'Same user can both create and approve journal entries',
                        severity: 'medium',
                        status: 'open'
                    }
                ]
            },
            {
                id: 'audit2',
                title: 'Information Security Assessment',
                description: 'Comprehensive security audit covering network, application, and data security controls',
                type: 'security',
                status: 'planning',
                priority: 'critical',
                leadAuditor: 'user3',
                startDate: '2025-01-15',
                endDate: '2025-03-15',
                progress: 15,
                createdAt: new Date('2024-12-15').toISOString(),
                findings: []
            }
        ];

        // Sample Tasks
        const tasks = [
            {
                id: 'task1',
                title: 'Review Financial Close Process',
                description: 'Document and test the monthly financial close process controls',
                auditId: 'audit1',
                assignedTo: 'user3',
                status: 'completed',
                priority: 'high',
                dueDate: '2024-12-15',
                progress: 100,
                createdAt: new Date('2024-12-01').toISOString(),
                checklist: [
                    { id: 'check1', item: 'Obtain process documentation', completed: true },
                    { id: 'check2', item: 'Interview process owners', completed: true },
                    { id: 'check3', item: 'Test control effectiveness', completed: true },
                    { id: 'check4', item: 'Document findings', completed: true }
                ]
            },
            {
                id: 'task2',
                title: 'Test User Access Controls',
                description: 'Review and test user access provisioning and deprovisioning controls',
                auditId: 'audit1',
                assignedTo: 'user2',
                status: 'in_progress',
                priority: 'medium',
                dueDate: '2024-12-25',
                progress: 50,
                createdAt: new Date('2024-12-10').toISOString(),
                checklist: [
                    { id: 'check5', item: 'Review access control policy', completed: true },
                    { id: 'check6', item: 'Test new user provisioning', completed: true },
                    { id: 'check7', item: 'Test user deprovisioning', completed: false },
                    { id: 'check8', item: 'Review privileged access', completed: false }
                ]
            },
            {
                id: 'task3',
                title: 'Network Security Assessment',
                description: 'Conduct network vulnerability assessment and penetration testing',
                auditId: 'audit2',
                assignedTo: 'user3',
                status: 'pending',
                priority: 'critical',
                dueDate: '2025-02-01',
                progress: 0,
                createdAt: new Date('2024-12-15').toISOString(),
                checklist: [
                    { id: 'check9', item: 'Scope network assessment', completed: false },
                    { id: 'check10', item: 'Run vulnerability scans', completed: false },
                    { id: 'check11', item: 'Conduct penetration testing', completed: false },
                    { id: 'check12', item: 'Document security findings', completed: false }
                ]
            }
        ];

        // Sample Vulnerabilities
        const vulnerabilities = [
            {
                id: 'vuln1',
                title: 'Outdated Apache Web Server',
                description: 'Web server running outdated version with known security vulnerabilities',
                severity: 'high',
                status: 'open',
                target: '192.168.1.100',
                port: 80,
                discoveredAt: new Date('2024-12-01').toISOString(),
                auditId: 'audit2',
                cvssScore: 7.5,
                category: 'web_application'
            },
            {
                id: 'vuln2',
                title: 'Weak SSL/TLS Configuration',
                description: 'SSL/TLS configuration allows weak cipher suites and protocols',
                severity: 'medium',
                status: 'open',
                target: 'app.company.com',
                port: 443,
                discoveredAt: new Date('2024-12-02').toISOString(),
                auditId: 'audit2',
                cvssScore: 5.3,
                category: 'network'
            },
            {
                id: 'vuln3',
                title: 'Default Database Credentials',
                description: 'Database server accessible with default administrative credentials',
                severity: 'critical',
                status: 'open',
                target: '192.168.1.200',
                port: 3306,
                discoveredAt: new Date('2024-12-03').toISOString(),
                auditId: 'audit2',
                cvssScore: 9.8,
                category: 'database'
            }
        ];

        // Sample Compliance Frameworks
        const complianceFrameworks = [
            {
                id: 'sox',
                name: 'SOX',
                fullName: 'Sarbanes-Oxley Act',
                description: 'Financial reporting compliance framework',
                controls: [
                    { id: 'sox-302', title: 'CEO/CFO Certification', status: 'passed' },
                    { id: 'sox-404', title: 'Internal Control Assessment', status: 'pending' }
                ]
            },
            {
                id: 'iso27001',
                name: 'ISO27001',
                fullName: 'Information Security Management',
                description: 'International standard for information security',
                controls: [
                    { id: 'iso-5.1.1', title: 'Information Security Policy', status: 'passed' },
                    { id: 'iso-9.1.1', title: 'Access Control Policy', status: 'failed' }
                ]
            }
        ];

        // Store in localStorage
        localStorage.setItem('auditSystem_users', JSON.stringify(users));
        localStorage.setItem('auditSystem_audits', JSON.stringify(audits));
        localStorage.setItem('auditSystem_tasks', JSON.stringify(tasks));
        localStorage.setItem('auditSystem_vulnerabilities', JSON.stringify(vulnerabilities));
        localStorage.setItem('auditSystem_compliance', JSON.stringify(complianceFrameworks));
    }

    // Data access methods
    getUsers() {
        return JSON.parse(localStorage.getItem('auditSystem_users') || '[]');
    }

    getAudits() {
        return JSON.parse(localStorage.getItem('auditSystem_audits') || '[]');
    }

    getTasks() {
        return JSON.parse(localStorage.getItem('auditSystem_tasks') || '[]');
    }

    getVulnerabilities() {
        return JSON.parse(localStorage.getItem('auditSystem_vulnerabilities') || '[]');
    }

    getComplianceFrameworks() {
        return JSON.parse(localStorage.getItem('auditSystem_compliance') || '[]');
    }

    saveAudits(audits) {
        localStorage.setItem('auditSystem_audits', JSON.stringify(audits));
    }

    saveTasks(tasks) {
        localStorage.setItem('auditSystem_tasks', JSON.stringify(tasks));
    }

    saveVulnerabilities(vulnerabilities) {
        localStorage.setItem('auditSystem_vulnerabilities', JSON.stringify(vulnerabilities));
    }

    // Authentication
    setupEventListeners() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('auditSystem_currentUser', JSON.stringify(user));
            this.showMainApp();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid credentials. Please try again.', 'danger');
        }
    }

    checkAuthentication() {
        const savedUser = localStorage.getItem('auditSystem_currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('auditSystem_currentUser');
        this.showLoginScreen();
        this.showNotification('Logged out successfully', 'info');
    }

    showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('mainNav').style.display = 'none';
        document.getElementById('mainContent').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainNav').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';
        
        // Update user display
        document.getElementById('userName').textContent = 
            `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        
        // Show dashboard by default
        this.showDashboard();
    }

    // Navigation
    setActiveNav(section) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.textContent.toLowerCase().includes(section.toLowerCase())) {
                link.classList.add('active');
            }
        });
    }

    // Dashboard
    showDashboard() {
        this.currentView = 'dashboard';
        this.setActiveNav('dashboard');
        
        const audits = this.getAudits();
        const tasks = this.getTasks();
        const vulnerabilities = this.getVulnerabilities();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
                    <button class="btn btn-outline-primary btn-sm" onclick="app.refreshDashboard()">
                        <i class="fas fa-sync-alt me-1"></i>Refresh
                    </button>
                </div>

                <!-- Key Metrics -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card dashboard-card">
                            <div class="card-body metric-card">
                                <div class="metric-value">${audits.length}</div>
                                <div class="metric-label">Total Audits</div>
                                <small class="text-muted">
                                    ${audits.filter(a => a.status === 'completed').length} completed
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card success">
                            <div class="card-body metric-card">
                                <div class="metric-value">${tasks.filter(t => t.status === 'completed').length}</div>
                                <div class="metric-label">Tasks Completed</div>
                                <small class="text-muted">
                                    ${tasks.length} total tasks
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card danger">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.severity === 'critical' || v.severity === 'high').length}</div>
                                <div class="metric-label">Critical/High Vulns</div>
                                <small class="text-muted">
                                    ${vulnerabilities.length} total vulnerabilities
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card warning">
                            <div class="card-body metric-card">
                                <div class="metric-value">${tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}</div>
                                <div class="metric-label">Overdue Tasks</div>
                                <small class="text-muted">
                                    Require attention
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Audit Status Distribution</h5>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="auditStatusChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Vulnerability Severity</h5>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="vulnSeverityChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Recent Audits</h5>
                            </div>
                            <div class="card-body">
                                ${this.renderRecentAudits(audits)}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Upcoming Tasks</h5>
                            </div>
                            <div class="card-body">
                                ${this.renderUpcomingTasks(tasks)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize charts
        setTimeout(() => {
            this.initializeDashboardCharts(audits, vulnerabilities);
        }, 100);
    }
    renderRecentAudits(audits) {
        if (audits.length === 0) {
            return '<p class="text-muted">No audits found.</p>';
        }

        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${audits.slice(0, 5).map(audit => `
                            <tr>
                                <td>
                                    <strong>${audit.title}</strong><br>
                                    <small class="text-muted">${audit.description.substring(0, 50)}...</small>
                                </td>
                                <td><span class="badge bg-primary">${audit.type.toUpperCase()}</span></td>
                                <td>${this.getStatusBadge(audit.status)}</td>
                                <td>
                                    <div class="progress" style="height: 20px;">
                                        <div class="progress-bar" role="progressbar" style="width: ${audit.progress}%">
                                            ${audit.progress}%
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderUpcomingTasks(tasks) {
        const upcomingTasks = tasks
            .filter(task => task.status !== 'completed')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5);

        if (upcomingTasks.length === 0) {
            return '<p class="text-muted">No upcoming tasks found.</p>';
        }

        return `
            <div class="list-group list-group-flush">
                ${upcomingTasks.map(task => `
                    <div class="list-group-item border-0 px-0">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${task.title}</h6>
                                <p class="mb-1 text-muted small">${task.description.substring(0, 60)}...</p>
                                <small class="text-muted">
                                    Due: ${this.formatDate(task.dueDate)}
                                </small>
                            </div>
                            <div class="ms-2">
                                ${this.getPriorityBadge(task.priority)}
                            </div>
                        </div>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar" role="progressbar" style="width: ${task.progress}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    initializeDashboardCharts(audits, vulnerabilities) {
        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });

        // Audit Status Chart
        const auditStatusCounts = {
            planning: audits.filter(a => a.status === 'planning').length,
            in_progress: audits.filter(a => a.status === 'in_progress').length,
            completed: audits.filter(a => a.status === 'completed').length
        };

        const auditCtx = document.getElementById('auditStatusChart');
        if (auditCtx) {
            this.charts.auditStatus = new Chart(auditCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Planning', 'In Progress', 'Completed'],
                    datasets: [{
                        data: [auditStatusCounts.planning, auditStatusCounts.in_progress, auditStatusCounts.completed],
                        backgroundColor: ['#6c757d', '#0dcaf0', '#198754']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Vulnerability Severity Chart
        const vulnSeverityCounts = {
            critical: vulnerabilities.filter(v => v.severity === 'critical').length,
            high: vulnerabilities.filter(v => v.severity === 'high').length,
            medium: vulnerabilities.filter(v => v.severity === 'medium').length,
            low: vulnerabilities.filter(v => v.severity === 'low').length
        };

        const vulnCtx = document.getElementById('vulnSeverityChart');
        if (vulnCtx) {
            this.charts.vulnSeverity = new Chart(vulnCtx, {
                type: 'bar',
                data: {
                    labels: ['Critical', 'High', 'Medium', 'Low'],
                    datasets: [{
                        label: 'Vulnerabilities',
                        data: [vulnSeverityCounts.critical, vulnSeverityCounts.high, vulnSeverityCounts.medium, vulnSeverityCounts.low],
                        backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#198754']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }
    }

    // Audits Management
    showAudits() {
        this.currentView = 'audits';
        this.setActiveNav('audits');
        
        const audits = this.getAudits();
        const users = this.getUsers();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-clipboard-list me-2"></i>Audits</h2>
                    <button class="btn btn-primary" onclick="app.showCreateAuditModal()">
                        <i class="fas fa-plus me-1"></i>Create Audit
                    </button>
                </div>

                <div class="row">
                    ${audits.map(audit => {
                        const leadAuditor = users.find(u => u.id === audit.leadAuditor);
                        return `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="card h-100">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">${audit.title}</h6>
                                        ${this.getStatusBadge(audit.status)}
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text text-muted small">${audit.description}</p>
                                        <div class="mb-2">
                                            <small class="text-muted">Type:</small>
                                            <span class="badge bg-secondary ms-1">${audit.type.toUpperCase()}</span>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Priority:</small>
                                            ${this.getPriorityBadge(audit.priority)}
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Lead Auditor:</small>
                                            <span class="ms-1">${leadAuditor ? leadAuditor.firstName + ' ' + leadAuditor.lastName : 'Unknown'}</span>
                                        </div>
                                        <div class="mb-3">
                                            <small class="text-muted">Progress:</small>
                                            <div class="progress mt-1">
                                                <div class="progress-bar" role="progressbar" style="width: ${audit.progress}%">
                                                    ${audit.progress}%
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted">
                                                ${this.formatDate(audit.startDate)} - ${this.formatDate(audit.endDate)}
                                            </small>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-primary" onclick="app.viewAuditDetails('${audit.id}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-outline-secondary" onclick="app.editAudit('${audit.id}')">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    showCreateAuditModal() {
        const users = this.getUsers();
        const leadAuditorSelect = document.querySelector('#auditModal select[name="leadAuditor"]');
        leadAuditorSelect.innerHTML = '<option value="">Select Lead Auditor</option>' +
            users.map(user => `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`).join('');

        const modal = new bootstrap.Modal(document.getElementById('auditModal'));
        modal.show();
    }

    saveAudit() {
        const form = document.getElementById('auditForm');
        const formData = new FormData(form);
        
        const audit = {
            id: 'audit' + Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            type: formData.get('type'),
            priority: formData.get('priority'),
            leadAuditor: formData.get('leadAuditor'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            status: 'planning',
            progress: 0,
            createdAt: new Date().toISOString(),
            findings: []
        };

        const audits = this.getAudits();
        audits.push(audit);
        this.saveAudits(audits);

        const modal = bootstrap.Modal.getInstance(document.getElementById('auditModal'));
        modal.hide();
        form.reset();

        this.showNotification('Audit created successfully!', 'success');
        this.showAudits();
    }

    viewAuditDetails(auditId) {
        const audits = this.getAudits();
        const tasks = this.getTasks().filter(t => t.auditId === auditId);
        const vulnerabilities = this.getVulnerabilities().filter(v => v.auditId === auditId);
        const audit = audits.find(a => a.id === auditId);
        const users = this.getUsers();

        if (!audit) return;

        const leadAuditor = users.find(u => u.id === audit.leadAuditor);

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="app.showAudits()">
                            <i class="fas fa-arrow-left me-1"></i>Back to Audits
                        </button>
                        <h2>${audit.title}</h2>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" onclick="app.generateAuditReport('${audit.id}')">
                            <i class="fas fa-file-pdf me-1"></i>Generate Report
                        </button>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Audit Details</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><strong>Type:</strong> <span class="badge bg-primary">${audit.type.toUpperCase()}</span></p>
                                        <p><strong>Status:</strong> ${this.getStatusBadge(audit.status)}</p>
                                        <p><strong>Priority:</strong> ${this.getPriorityBadge(audit.priority)}</p>
                                        <p><strong>Lead Auditor:</strong> ${leadAuditor ? leadAuditor.firstName + ' ' + leadAuditor.lastName : 'Unknown'}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Start Date:</strong> ${this.formatDate(audit.startDate)}</p>
                                        <p><strong>End Date:</strong> ${this.formatDate(audit.endDate)}</p>
                                        <p><strong>Progress:</strong></p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${audit.progress}%">
                                                ${audit.progress}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <p><strong>Description:</strong></p>
                                    <p class="text-muted">${audit.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">Quick Stats</h6>
                            </div>
                            <div class="card-body">
                                <div class="row text-center">
                                    <div class="col-6">
                                        <div class="metric-value text-primary">${tasks.length}</div>
                                        <div class="metric-label">Tasks</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="metric-value text-danger">${vulnerabilities.length}</div>
                                        <div class="metric-label">Vulnerabilities</div>
                                    </div>
                                </div>
                                <div class="row text-center mt-3">
                                    <div class="col-6">
                                        <div class="metric-value text-success">${tasks.filter(t => t.status === 'completed').length}</div>
                                        <div class="metric-label">Completed</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="metric-value text-warning">${audit.findings.length}</div>
                                        <div class="metric-label">Findings</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tasks Section -->
                <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Tasks</h5>
                        <button class="btn btn-primary btn-sm" onclick="app.showCreateTaskModal('${audit.id}')">
                            <i class="fas fa-plus me-1"></i>Add Task
                        </button>
                    </div>
                    <div class="card-body">
                        ${this.renderTasksList(tasks)}
                    </div>
                </div>

                <!-- Vulnerabilities Section -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">Vulnerabilities</h5>
                    </div>
                    <div class="card-body">
                        ${this.renderVulnerabilitiesList(vulnerabilities)}
                    </div>
                </div>

                <!-- Findings Section -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Findings</h5>
                    </div>
                    <div class="card-body">
                        ${this.renderFindingsList(audit.findings)}
                    </div>
                </div>
            </div>
        `;
    }
    // Tasks Management
    showTasks() {
        this.currentView = 'tasks';
        this.setActiveNav('tasks');
        
        const tasks = this.getTasks();
        const audits = this.getAudits();
        const users = this.getUsers();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-tasks me-2"></i>Tasks</h2>
                    <button class="btn btn-primary" onclick="app.showCreateTaskModal()">
                        <i class="fas fa-plus me-1"></i>Create Task
                    </button>
                </div>

                <div class="row">
                    ${tasks.map(task => {
                        const audit = audits.find(a => a.id === task.auditId);
                        const assignedUser = users.find(u => u.id === task.assignedTo);
                        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                        
                        return `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="card h-100 ${isOverdue ? 'border-danger' : ''}">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">${task.title}</h6>
                                        ${this.getStatusBadge(task.status)}
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text text-muted small">${task.description}</p>
                                        <div class="mb-2">
                                            <small class="text-muted">Audit:</small>
                                            <span class="ms-1">${audit ? audit.title : 'Unknown'}</span>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Assigned to:</small>
                                            <span class="ms-1">${assignedUser ? assignedUser.firstName + ' ' + assignedUser.lastName : 'Unknown'}</span>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Priority:</small>
                                            ${this.getPriorityBadge(task.priority)}
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Due Date:</small>
                                            <span class="ms-1 ${isOverdue ? 'text-danger fw-bold' : ''}">${this.formatDate(task.dueDate)}</span>
                                            ${isOverdue ? '<i class="fas fa-exclamation-triangle text-danger ms-1"></i>' : ''}
                                        </div>
                                        <div class="mb-3">
                                            <small class="text-muted">Progress:</small>
                                            <div class="progress mt-1">
                                                <div class="progress-bar" role="progressbar" style="width: ${task.progress}%">
                                                    ${task.progress}%
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted">
                                                ${task.checklist ? task.checklist.filter(c => c.completed).length + '/' + task.checklist.length + ' items' : '0 items'}
                                            </small>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-primary" onclick="app.viewTaskDetails('${task.id}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-outline-success" onclick="app.updateTaskStatus('${task.id}', 'completed')">
                                                    <i class="fas fa-check"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    showCreateTaskModal(preselectedAuditId = '') {
        const audits = this.getAudits();
        const users = this.getUsers();
        
        const auditSelect = document.querySelector('#taskModal select[name="auditId"]');
        auditSelect.innerHTML = '<option value="">Select Audit</option>' +
            audits.map(audit => `<option value="${audit.id}" ${audit.id === preselectedAuditId ? 'selected' : ''}>${audit.title}</option>`).join('');

        const userSelect = document.querySelector('#taskModal select[name="assignedTo"]');
        userSelect.innerHTML = '<option value="">Select User</option>' +
            users.map(user => `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`).join('');

        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }

    saveTask() {
        const form = document.getElementById('taskForm');
        const formData = new FormData(form);
        
        const task = {
            id: 'task' + Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            auditId: formData.get('auditId'),
            assignedTo: formData.get('assignedTo'),
            priority: formData.get('priority'),
            dueDate: formData.get('dueDate'),
            status: 'pending',
            progress: 0,
            createdAt: new Date().toISOString(),
            checklist: []
        };

        const tasks = this.getTasks();
        tasks.push(task);
        this.saveTasks(tasks);

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        form.reset();

        this.showNotification('Task created successfully!', 'success');
        if (this.currentView === 'tasks') {
            this.showTasks();
        }
    }

    viewTaskDetails(taskId) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        const audits = this.getAudits();
        const users = this.getUsers();

        if (!task) return;

        const audit = audits.find(a => a.id === task.auditId);
        const assignedUser = users.find(u => u.id === task.assignedTo);

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="app.showTasks()">
                            <i class="fas fa-arrow-left me-1"></i>Back to Tasks
                        </button>
                        <h2>${task.title}</h2>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-success" onclick="app.updateTaskStatus('${task.id}', 'completed')">
                            <i class="fas fa-check me-1"></i>Mark Complete
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Task Details</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><strong>Status:</strong> ${this.getStatusBadge(task.status)}</p>
                                        <p><strong>Priority:</strong> ${this.getPriorityBadge(task.priority)}</p>
                                        <p><strong>Assigned to:</strong> ${assignedUser ? assignedUser.firstName + ' ' + assignedUser.lastName : 'Unknown'}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Audit:</strong> ${audit ? audit.title : 'Unknown'}</p>
                                        <p><strong>Due Date:</strong> ${this.formatDate(task.dueDate)}</p>
                                        <p><strong>Progress:</strong></p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${task.progress}%">
                                                ${task.progress}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <p><strong>Description:</strong></p>
                                    <p class="text-muted">${task.description}</p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">Checklist</h5>
                                <button class="btn btn-primary btn-sm" onclick="app.addChecklistItem('${task.id}')">
                                    <i class="fas fa-plus me-1"></i>Add Item
                                </button>
                            </div>
                            <div class="card-body">
                                ${this.renderTaskChecklist(task)}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">Actions</h6>
                            </div>
                            <div class="card-body">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-outline-primary" onclick="app.updateTaskStatus('${task.id}', 'in_progress')">
                                        <i class="fas fa-play me-1"></i>Start Task
                                    </button>
                                    <button class="btn btn-outline-success" onclick="app.updateTaskStatus('${task.id}', 'completed')">
                                        <i class="fas fa-check me-1"></i>Complete Task
                                    </button>
                                    <button class="btn btn-outline-warning" onclick="app.updateTaskStatus('${task.id}', 'blocked')">
                                        <i class="fas fa-pause me-1"></i>Block Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTaskChecklist(task) {
        if (!task.checklist || task.checklist.length === 0) {
            return '<p class="text-muted">No checklist items yet. Add items to track progress.</p>';
        }

        return task.checklist.map(item => `
            <div class="checklist-item ${item.completed ? 'completed' : ''}">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" ${item.completed ? 'checked' : ''} 
                           onchange="app.toggleChecklistItem('${task.id}', '${item.id}')">
                    <label class="form-check-label ${item.completed ? 'text-decoration-line-through' : ''}">
                        ${item.item}
                    </label>
                </div>
            </div>
        `).join('');
    }

    addChecklistItem(taskId) {
        const item = prompt('Enter checklist item:');
        if (!item) return;

        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        if (!task.checklist) task.checklist = [];
        
        task.checklist.push({
            id: 'check' + Date.now(),
            item: item,
            completed: false
        });

        this.saveTasks(tasks);
        this.viewTaskDetails(taskId);
        this.showNotification('Checklist item added!', 'success');
    }

    toggleChecklistItem(taskId, itemId) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (!task || !task.checklist) return;

        const item = task.checklist.find(i => i.id === itemId);
        if (!item) return;

        item.completed = !item.completed;

        // Update task progress based on checklist completion
        const completedItems = task.checklist.filter(i => i.completed).length;
        task.progress = Math.round((completedItems / task.checklist.length) * 100);

        // Auto-complete task if all items are done
        if (task.progress === 100 && task.status !== 'completed') {
            task.status = 'completed';
        }

        this.saveTasks(tasks);
        this.viewTaskDetails(taskId);
    }

    updateTaskStatus(taskId, status) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        task.status = status;
        if (status === 'completed') {
            task.progress = 100;
        }

        this.saveTasks(tasks);
        this.showNotification(`Task ${status.replace('_', ' ')}!`, 'success');
        
        if (this.currentView === 'tasks') {
            this.showTasks();
        } else {
            this.viewTaskDetails(taskId);
        }
    }

    renderTasksList(tasks) {
        if (tasks.length === 0) {
            return '<p class="text-muted">No tasks found for this audit.</p>';
        }

        const users = this.getUsers();

        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tasks.map(task => {
                            const assignedUser = users.find(u => u.id === task.assignedTo);
                            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                            
                            return `
                                <tr>
                                    <td>
                                        <strong>${task.title}</strong><br>
                                        <small class="text-muted">${task.description.substring(0, 50)}...</small>
                                    </td>
                                    <td>${assignedUser ? assignedUser.firstName + ' ' + assignedUser.lastName : 'Unknown'}</td>
                                    <td>${this.getStatusBadge(task.status)}</td>
                                    <td>${this.getPriorityBadge(task.priority)}</td>
                                    <td class="${isOverdue ? 'text-danger fw-bold' : ''}">
                                        ${this.formatDate(task.dueDate)}
                                        ${isOverdue ? '<i class="fas fa-exclamation-triangle ms-1"></i>' : ''}
                                    </td>
                                    <td>
                                        <div class="progress" style="height: 20px;">
                                            <div class="progress-bar" role="progressbar" style="width: ${task.progress}%">
                                                ${task.progress}%
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="btn-group btn-group-sm">
                                            <button class="btn btn-outline-primary" onclick="app.viewTaskDetails('${task.id}')">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-outline-success" onclick="app.updateTaskStatus('${task.id}', 'completed')">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    // Vulnerabilities Management
    showVulnerabilities() {
        this.currentView = 'vulnerabilities';
        this.setActiveNav('vulnerabilities');
        
        const vulnerabilities = this.getVulnerabilities();
        const audits = this.getAudits();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-bug me-2"></i>Vulnerabilities</h2>
                    <button class="btn btn-primary" onclick="app.showVulnerabilityScanModal()">
                        <i class="fas fa-search me-1"></i>Run Scan
                    </button>
                </div>

                <!-- Summary Cards -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card dashboard-card danger">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.severity === 'critical').length}</div>
                                <div class="metric-label">Critical</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card warning">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.severity === 'high').length}</div>
                                <div class="metric-label">High</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card info">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.severity === 'medium').length}</div>
                                <div class="metric-label">Medium</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card success">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.severity === 'low').length}</div>
                                <div class="metric-label">Low</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vulnerabilities List -->
                <div class="row">
                    ${vulnerabilities.map(vuln => {
                        const audit = audits.find(a => a.id === vuln.auditId);
                        return `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="card vulnerability-card ${vuln.severity}">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">${vuln.title}</h6>
                                        ${this.getSeverityBadge(vuln.severity)}
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text text-muted small">${vuln.description}</p>
                                        <div class="mb-2">
                                            <small class="text-muted">Target:</small>
                                            <code class="ms-1">${vuln.target}:${vuln.port}</code>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Category:</small>
                                            <span class="badge bg-secondary ms-1">${vuln.category.replace('_', ' ').toUpperCase()}</span>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">CVSS Score:</small>
                                            <span class="ms-1 fw-bold">${vuln.cvssScore}</span>
                                        </div>
                                        <div class="mb-2">
                                            <small class="text-muted">Status:</small>
                                            ${this.getStatusBadge(vuln.status)}
                                        </div>
                                        <div class="mb-3">
                                            <small class="text-muted">Discovered:</small>
                                            <span class="ms-1">${this.formatDate(vuln.discoveredAt)}</span>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted">
                                                ${audit ? audit.title.substring(0, 20) + '...' : 'No audit'}
                                            </small>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-primary" onclick="app.viewVulnerabilityDetails('${vuln.id}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-outline-success" onclick="app.resolveVulnerability('${vuln.id}')">
                                                    <i class="fas fa-check"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    showVulnerabilityScanModal() {
        const audits = this.getAudits();
        const auditSelect = document.querySelector('#scanModal select[name="auditId"]');
        auditSelect.innerHTML = '<option value="">Select Audit</option>' +
            audits.map(audit => `<option value="${audit.id}">${audit.title}</option>`).join('');

        const modal = new bootstrap.Modal(document.getElementById('scanModal'));
        modal.show();
    }

    startVulnerabilityScan() {
        const form = document.getElementById('scanForm');
        const formData = new FormData(form);
        
        const targets = formData.get('targets').split('\n').filter(t => t.trim());
        const scanner = formData.get('scanner');
        const auditId = formData.get('auditId');

        if (targets.length === 0) {
            this.showNotification('Please enter at least one target', 'warning');
            return;
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('scanModal'));
        modal.hide();
        form.reset();

        this.showNotification('Starting vulnerability scan...', 'info');

        // Simulate scan process
        setTimeout(() => {
            this.simulateVulnerabilityScan(targets, scanner, auditId);
        }, 2000);
    }

    simulateVulnerabilityScan(targets, scanner, auditId) {
        const vulnerabilities = this.getVulnerabilities();
        const newVulnerabilities = [];

        targets.forEach(target => {
            // Simulate finding vulnerabilities
            const vulnTypes = [
                { title: 'Open Port Detected', severity: 'medium', category: 'network' },
                { title: 'Outdated Software Version', severity: 'high', category: 'application' },
                { title: 'Weak Authentication', severity: 'critical', category: 'access_control' },
                { title: 'Missing Security Headers', severity: 'low', category: 'web_application' },
                { title: 'SQL Injection Vulnerability', severity: 'critical', category: 'web_application' },
                { title: 'Cross-Site Scripting (XSS)', severity: 'high', category: 'web_application' }
            ];

            // Randomly select 1-3 vulnerabilities per target
            const numVulns = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numVulns; i++) {
                const vulnType = vulnTypes[Math.floor(Math.random() * vulnTypes.length)];
                const vuln = {
                    id: 'vuln' + Date.now() + '_' + i,
                    title: vulnType.title + ' on ' + target,
                    description: `${vulnType.title} detected during ${scanner} scan of ${target}`,
                    severity: vulnType.severity,
                    status: 'open',
                    target: target,
                    port: Math.floor(Math.random() * 65535),
                    discoveredAt: new Date().toISOString(),
                    auditId: auditId,
                    cvssScore: this.calculateCVSSScore(vulnType.severity),
                    category: vulnType.category
                };
                newVulnerabilities.push(vuln);
            }
        });

        vulnerabilities.push(...newVulnerabilities);
        this.saveVulnerabilities(vulnerabilities);

        this.showNotification(`Scan completed! Found ${newVulnerabilities.length} vulnerabilities.`, 'success');
        
        if (this.currentView === 'vulnerabilities') {
            this.showVulnerabilities();
        }
    }

    calculateCVSSScore(severity) {
        const scores = {
            'low': Math.random() * 3.9 + 0.1,
            'medium': Math.random() * 2.9 + 4.0,
            'high': Math.random() * 2.9 + 7.0,
            'critical': Math.random() * 1.0 + 9.0
        };
        return Math.round(scores[severity] * 10) / 10;
    }

    viewVulnerabilityDetails(vulnId) {
        const vulnerabilities = this.getVulnerabilities();
        const vuln = vulnerabilities.find(v => v.id === vulnId);
        const audits = this.getAudits();

        if (!vuln) return;

        const audit = audits.find(a => a.id === vuln.auditId);

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="app.showVulnerabilities()">
                            <i class="fas fa-arrow-left me-1"></i>Back to Vulnerabilities
                        </button>
                        <h2>${vuln.title}</h2>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-success" onclick="app.resolveVulnerability('${vuln.id}')">
                            <i class="fas fa-check me-1"></i>Mark Resolved
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Vulnerability Details</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p><strong>Severity:</strong> ${this.getSeverityBadge(vuln.severity)}</p>
                                        <p><strong>Status:</strong> ${this.getStatusBadge(vuln.status)}</p>
                                        <p><strong>CVSS Score:</strong> <span class="fw-bold">${vuln.cvssScore}</span></p>
                                        <p><strong>Category:</strong> <span class="badge bg-secondary">${vuln.category.replace('_', ' ').toUpperCase()}</span></p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><strong>Target:</strong> <code>${vuln.target}:${vuln.port}</code></p>
                                        <p><strong>Discovered:</strong> ${this.formatDate(vuln.discoveredAt)}</p>
                                        <p><strong>Associated Audit:</strong> ${audit ? audit.title : 'None'}</p>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <p><strong>Description:</strong></p>
                                    <p class="text-muted">${vuln.description}</p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Remediation Recommendations</h5>
                            </div>
                            <div class="card-body">
                                ${this.getRemediationRecommendations(vuln)}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">Risk Assessment</h6>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label class="form-label">Risk Level</label>
                                    <div class="progress">
                                        <div class="progress-bar bg-${this.getRiskColor(vuln.severity)}" 
                                             role="progressbar" style="width: ${this.getRiskPercentage(vuln.severity)}%">
                                            ${vuln.severity.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Business Impact</label>
                                    <p class="text-muted">${this.getBusinessImpact(vuln.severity)}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Exploitability</label>
                                    <p class="text-muted">${this.getExploitability(vuln.category)}</p>
                                </div>
                            </div>
                        </div>

                        <div class="card mt-3">
                            <div class="card-header">
                                <h6 class="mb-0">Actions</h6>
                            </div>
                            <div class="card-body">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-outline-success" onclick="app.resolveVulnerability('${vuln.id}')">
                                        <i class="fas fa-check me-1"></i>Mark Resolved
                                    </button>
                                    <button class="btn btn-outline-warning" onclick="app.updateVulnerabilityStatus('${vuln.id}', 'in_progress')">
                                        <i class="fas fa-tools me-1"></i>In Progress
                                    </button>
                                    <button class="btn btn-outline-secondary" onclick="app.updateVulnerabilityStatus('${vuln.id}', 'false_positive')">
                                        <i class="fas fa-times me-1"></i>False Positive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getRemediationRecommendations(vuln) {
        const recommendations = {
            'network': [
                'Review firewall rules and close unnecessary ports',
                'Implement network segmentation',
                'Enable intrusion detection systems',
                'Regular network security assessments'
            ],
            'web_application': [
                'Update web application to latest version',
                'Implement input validation and sanitization',
                'Use parameterized queries to prevent SQL injection',
                'Enable security headers (CSP, HSTS, etc.)'
            ],
            'database': [
                'Change default credentials immediately',
                'Implement strong authentication mechanisms',
                'Enable database encryption',
                'Regular security patches and updates'
            ],
            'application': [
                'Update software to latest stable version',
                'Review application configuration',
                'Implement secure coding practices',
                'Regular security code reviews'
            ],
            'access_control': [
                'Implement multi-factor authentication',
                'Review and update access policies',
                'Regular access reviews and audits',
                'Principle of least privilege'
            ]
        };

        const vulnRecommendations = recommendations[vuln.category] || [
            'Review security configuration',
            'Apply latest security patches',
            'Implement monitoring and alerting',
            'Regular security assessments'
        ];

        return `
            <ul class="list-group list-group-flush">
                ${vulnRecommendations.map(rec => `
                    <li class="list-group-item">
                        <i class="fas fa-check-circle text-success me-2"></i>
                        ${rec}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    getRiskColor(severity) {
        const colors = {
            'low': 'success',
            'medium': 'warning',
            'high': 'orange',
            'critical': 'danger'
        };
        return colors[severity] || 'secondary';
    }

    getRiskPercentage(severity) {
        const percentages = {
            'low': 25,
            'medium': 50,
            'high': 75,
            'critical': 100
        };
        return percentages[severity] || 50;
    }

    getBusinessImpact(severity) {
        const impacts = {
            'low': 'Minimal impact on business operations',
            'medium': 'Moderate impact, may affect some services',
            'high': 'Significant impact on business operations',
            'critical': 'Severe impact, immediate attention required'
        };
        return impacts[severity] || 'Unknown impact';
    }

    getExploitability(category) {
        const exploitability = {
            'network': 'Moderate - requires network access',
            'web_application': 'High - remotely exploitable',
            'database': 'Low - requires database access',
            'application': 'Moderate - depends on application exposure',
            'access_control': 'High - can lead to privilege escalation'
        };
        return exploitability[category] || 'Unknown exploitability';
    }

    resolveVulnerability(vulnId) {
        this.updateVulnerabilityStatus(vulnId, 'resolved');
    }

    updateVulnerabilityStatus(vulnId, status) {
        const vulnerabilities = this.getVulnerabilities();
        const vuln = vulnerabilities.find(v => v.id === vulnId);
        if (!vuln) return;

        vuln.status = status;
        this.saveVulnerabilities(vulnerabilities);

        this.showNotification(`Vulnerability ${status.replace('_', ' ')}!`, 'success');
        
        if (this.currentView === 'vulnerabilities') {
            this.showVulnerabilities();
        } else {
            this.viewVulnerabilityDetails(vulnId);
        }
    }

    renderVulnerabilitiesList(vulnerabilities) {
        if (vulnerabilities.length === 0) {
            return '<p class="text-muted">No vulnerabilities found for this audit.</p>';
        }

        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Vulnerability</th>
                            <th>Target</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>CVSS</th>
                            <th>Discovered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vulnerabilities.map(vuln => `
                            <tr>
                                <td>
                                    <strong>${vuln.title}</strong><br>
                                    <small class="text-muted">${vuln.description.substring(0, 50)}...</small>
                                </td>
                                <td><code>${vuln.target}:${vuln.port}</code></td>
                                <td>${this.getSeverityBadge(vuln.severity)}</td>
                                <td>${this.getStatusBadge(vuln.status)}</td>
                                <td><span class="fw-bold">${vuln.cvssScore}</span></td>
                                <td>${this.formatDate(vuln.discoveredAt)}</td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button class="btn btn-outline-primary" onclick="app.viewVulnerabilityDetails('${vuln.id}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-outline-success" onclick="app.resolveVulnerability('${vuln.id}')">
                                            <i class="fas fa-check"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    // Compliance Management
    showCompliance() {
        this.currentView = 'compliance';
        this.setActiveNav('compliance');
        
        const frameworks = this.getComplianceFrameworks();
        const audits = this.getAudits();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-check-circle me-2"></i>Compliance Management</h2>
                    <button class="btn btn-primary" onclick="app.generateComplianceChecklist()">
                        <i class="fas fa-list me-1"></i>Generate Checklist
                    </button>
                </div>

                <!-- Compliance Overview -->
                <div class="row mb-4">
                    ${frameworks.map(framework => {
                        const totalControls = framework.controls.length;
                        const passedControls = framework.controls.filter(c => c.status === 'passed').length;
                        const failedControls = framework.controls.filter(c => c.status === 'failed').length;
                        const pendingControls = framework.controls.filter(c => c.status === 'pending').length;
                        const compliancePercentage = totalControls > 0 ? Math.round((passedControls / totalControls) * 100) : 0;

                        return `
                            <div class="col-md-6 mb-4">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">${framework.name} - ${framework.fullName}</h5>
                                        <span class="badge bg-${compliancePercentage >= 80 ? 'success' : compliancePercentage >= 60 ? 'warning' : 'danger'}">
                                            ${compliancePercentage}% Compliant
                                        </span>
                                    </div>
                                    <div class="card-body">
                                        <p class="text-muted">${framework.description}</p>
                                        
                                        <div class="row text-center mb-3">
                                            <div class="col-3">
                                                <div class="metric-value text-primary">${totalControls}</div>
                                                <div class="metric-label">Total</div>
                                            </div>
                                            <div class="col-3">
                                                <div class="metric-value text-success">${passedControls}</div>
                                                <div class="metric-label">Passed</div>
                                            </div>
                                            <div class="col-3">
                                                <div class="metric-value text-danger">${failedControls}</div>
                                                <div class="metric-label">Failed</div>
                                            </div>
                                            <div class="col-3">
                                                <div class="metric-value text-warning">${pendingControls}</div>
                                                <div class="metric-label">Pending</div>
                                            </div>
                                        </div>

                                        <div class="progress mb-3">
                                            <div class="progress-bar bg-success" style="width: ${(passedControls/totalControls)*100}%"></div>
                                            <div class="progress-bar bg-danger" style="width: ${(failedControls/totalControls)*100}%"></div>
                                            <div class="progress-bar bg-warning" style="width: ${(pendingControls/totalControls)*100}%"></div>
                                        </div>

                                        <button class="btn btn-outline-primary btn-sm" onclick="app.viewComplianceDetails('${framework.id}')">
                                            <i class="fas fa-eye me-1"></i>View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Recent Compliance Activities -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Recent Compliance Activities</h5>
                    </div>
                    <div class="card-body">
                        ${this.renderComplianceActivities()}
                    </div>
                </div>
            </div>
        `;
    }

    viewComplianceDetails(frameworkId) {
        const frameworks = this.getComplianceFrameworks();
        const framework = frameworks.find(f => f.id === frameworkId);

        if (!framework) return;

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button class="btn btn-outline-secondary btn-sm me-2" onclick="app.showCompliance()">
                            <i class="fas fa-arrow-left me-1"></i>Back to Compliance
                        </button>
                        <h2>${framework.name} - ${framework.fullName}</h2>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary" onclick="app.generateComplianceReport('${framework.id}')">
                            <i class="fas fa-file-pdf me-1"></i>Generate Report
                        </button>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Framework Overview</h5>
                            </div>
                            <div class="card-body">
                                <p>${framework.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="mb-0">Compliance Status</h6>
                            </div>
                            <div class="card-body">
                                ${this.renderComplianceStatus(framework)}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Controls</h5>
                    </div>
                    <div class="card-body">
                        ${this.renderComplianceControls(framework.controls)}
                    </div>
                </div>
            </div>
        `;
    }

    renderComplianceStatus(framework) {
        const totalControls = framework.controls.length;
        const passedControls = framework.controls.filter(c => c.status === 'passed').length;
        const failedControls = framework.controls.filter(c => c.status === 'failed').length;
        const pendingControls = framework.controls.filter(c => c.status === 'pending').length;
        const compliancePercentage = totalControls > 0 ? Math.round((passedControls / totalControls) * 100) : 0;

        return `
            <div class="text-center mb-3">
                <div class="metric-value text-${compliancePercentage >= 80 ? 'success' : compliancePercentage >= 60 ? 'warning' : 'danger'}">
                    ${compliancePercentage}%
                </div>
                <div class="metric-label">Compliance Rate</div>
            </div>
            
            <div class="progress mb-3" style="height: 20px;">
                <div class="progress-bar bg-success" style="width: ${(passedControls/totalControls)*100}%" 
                     title="Passed: ${passedControls}"></div>
                <div class="progress-bar bg-danger" style="width: ${(failedControls/totalControls)*100}%" 
                     title="Failed: ${failedControls}"></div>
                <div class="progress-bar bg-warning" style="width: ${(pendingControls/totalControls)*100}%" 
                     title="Pending: ${pendingControls}"></div>
            </div>

            <div class="row text-center">
                <div class="col-4">
                    <small class="text-success">
                        <i class="fas fa-check-circle"></i><br>
                        ${passedControls} Passed
                    </small>
                </div>
                <div class="col-4">
                    <small class="text-danger">
                        <i class="fas fa-times-circle"></i><br>
                        ${failedControls} Failed
                    </small>
                </div>
                <div class="col-4">
                    <small class="text-warning">
                        <i class="fas fa-clock"></i><br>
                        ${pendingControls} Pending
                    </small>
                </div>
            </div>
        `;
    }

    renderComplianceControls(controls) {
        return controls.map(control => `
            <div class="compliance-control ${control.status}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${control.id} - ${control.title}</h6>
                        <p class="text-muted mb-2">${control.description || 'No description available'}</p>
                    </div>
                    <div class="ms-3">
                        <span class="badge bg-${control.status === 'passed' ? 'success' : control.status === 'failed' ? 'danger' : 'warning'}">
                            ${control.status.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div class="mt-2">
                    <button class="btn btn-outline-primary btn-sm me-2" onclick="app.testControl('${control.id}')">
                        <i class="fas fa-play me-1"></i>Test Control
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="app.viewControlEvidence('${control.id}')">
                        <i class="fas fa-folder me-1"></i>Evidence
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderComplianceActivities() {
        const activities = [
            { action: 'SOX-302 control tested', user: 'John Manager', time: '2 hours ago', status: 'passed' },
            { action: 'ISO-9.1.1 control failed', user: 'Jane Auditor', time: '4 hours ago', status: 'failed' },
            { action: 'Compliance report generated', user: 'System Admin', time: '1 day ago', status: 'completed' },
            { action: 'SOX-404 control pending review', user: 'John Manager', time: '2 days ago', status: 'pending' }
        ];

        return `
            <div class="timeline">
                ${activities.map(activity => `
                    <div class="timeline-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${activity.action}</strong><br>
                                <small class="text-muted">by ${activity.user}</small>
                            </div>
                            <div class="text-end">
                                <span class="badge bg-${activity.status === 'passed' ? 'success' : activity.status === 'failed' ? 'danger' : 'warning'}">
                                    ${activity.status.toUpperCase()}
                                </span><br>
                                <small class="text-muted">${activity.time}</small>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    testControl(controlId) {
        // Simulate control testing
        const result = Math.random() > 0.3 ? 'passed' : 'failed';
        
        const frameworks = this.getComplianceFrameworks();
        frameworks.forEach(framework => {
            const control = framework.controls.find(c => c.id === controlId);
            if (control) {
                control.status = result;
            }
        });
        
        localStorage.setItem('auditSystem_compliance', JSON.stringify(frameworks));
        
        this.showNotification(`Control ${controlId} test ${result}!`, result === 'passed' ? 'success' : 'danger');
        
        if (this.currentView === 'compliance') {
            this.showCompliance();
        }
    }

    generateComplianceChecklist() {
        this.showNotification('Compliance checklist generated!', 'success');
        // In a real application, this would generate tasks based on compliance requirements
    }

    generateComplianceReport(frameworkId) {
        this.showNotification('Compliance report generation started...', 'info');
        // Simulate report generation
        setTimeout(() => {
            this.showNotification('Compliance report generated successfully!', 'success');
        }, 2000);
    }

    // Reports Management
    showReports() {
        this.currentView = 'reports';
        this.setActiveNav('reports');
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-file-pdf me-2"></i>Reports</h2>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-clipboard-list fa-3x text-primary mb-3"></i>
                                <h5>Audit Report</h5>
                                <p class="text-muted">Generate comprehensive audit reports with findings and recommendations</p>
                                <button class="btn btn-primary" onclick="app.generateAuditReport()">
                                    <i class="fas fa-download me-1"></i>Generate
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-bug fa-3x text-danger mb-3"></i>
                                <h5>Vulnerability Report</h5>
                                <p class="text-muted">Detailed vulnerability assessment reports with risk analysis</p>
                                <button class="btn btn-primary" onclick="app.generateVulnerabilityReport()">
                                    <i class="fas fa-download me-1"></i>Generate
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                                <h5>Compliance Report</h5>
                                <p class="text-muted">Framework-specific compliance status and gap analysis</p>
                                <button class="btn btn-primary" onclick="app.generateComplianceReport()">
                                    <i class="fas fa-download me-1"></i>Generate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-chart-bar fa-3x text-info mb-3"></i>
                                <h5>Executive Summary</h5>
                                <p class="text-muted">High-level dashboard for management with key metrics and trends</p>
                                <button class="btn btn-primary" onclick="app.generateExecutiveSummary()">
                                    <i class="fas fa-download me-1"></i>Generate
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-tasks fa-3x text-warning mb-3"></i>
                                <h5>Task Summary</h5>
                                <p class="text-muted">Team performance and task completion analysis</p>
                                <button class="btn btn-primary" onclick="app.generateTaskSummary()">
                                    <i class="fas fa-download me-1"></i>Generate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Reports -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Recent Reports</h5>
                    </div>
                    <div class="card-body">
                        ${this.renderRecentReports()}
                    </div>
                </div>
            </div>
        `;
    }

    renderRecentReports() {
        const reports = [
            { name: 'Q4 2024 SOX Compliance Audit Report', type: 'Audit', generated: '2024-12-15', size: '2.3 MB' },
            { name: 'Security Vulnerability Assessment', type: 'Vulnerability', generated: '2024-12-10', size: '1.8 MB' },
            { name: 'ISO27001 Compliance Status', type: 'Compliance', generated: '2024-12-05', size: '1.2 MB' },
            { name: 'Executive Summary - December 2024', type: 'Executive', generated: '2024-12-01', size: '0.9 MB' }
        ];

        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Report Name</th>
                            <th>Type</th>
                            <th>Generated</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reports.map(report => `
                            <tr>
                                <td>
                                    <i class="fas fa-file-pdf text-danger me-2"></i>
                                    ${report.name}
                                </td>
                                <td><span class="badge bg-secondary">${report.type}</span></td>
                                <td>${this.formatDate(report.generated)}</td>
                                <td>${report.size}</td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button class="btn btn-outline-primary" onclick="app.downloadReport('${report.name}')">
                                            <i class="fas fa-download"></i>
                                        </button>
                                        <button class="btn btn-outline-secondary" onclick="app.previewReport('${report.name}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    generateAuditReport(auditId = null) {
        this.showNotification('Generating audit report...', 'info');
        setTimeout(() => {
            this.showNotification('Audit report generated successfully!', 'success');
        }, 2000);
    }

    generateVulnerabilityReport() {
        this.showNotification('Generating vulnerability report...', 'info');
        setTimeout(() => {
            this.showNotification('Vulnerability report generated successfully!', 'success');
        }, 2000);
    }

    generateExecutiveSummary() {
        this.showNotification('Generating executive summary...', 'info');
        setTimeout(() => {
            this.showNotification('Executive summary generated successfully!', 'success');
        }, 2000);
    }

    generateTaskSummary() {
        this.showNotification('Generating task summary...', 'info');
        setTimeout(() => {
            this.showNotification('Task summary generated successfully!', 'success');
        }, 2000);
    }

    downloadReport(reportName) {
        this.showNotification(`Downloading ${reportName}...`, 'info');
    }

    previewReport(reportName) {
        this.showNotification(`Opening preview for ${reportName}...`, 'info');
    }

    // Analytics
    showAnalytics() {
        this.currentView = 'analytics';
        this.setActiveNav('analytics');
        
        const audits = this.getAudits();
        const tasks = this.getTasks();
        const vulnerabilities = this.getVulnerabilities();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="fas fa-chart-bar me-2"></i>Analytics</h2>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" onclick="app.refreshAnalytics()">
                            <i class="fas fa-sync-alt me-1"></i>Refresh
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="app.exportAnalytics()">
                            <i class="fas fa-download me-1"></i>Export
                        </button>
                    </div>
                </div>

                <!-- Key Performance Indicators -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card dashboard-card">
                            <div class="card-body metric-card">
                                <div class="metric-value">${Math.round((audits.filter(a => a.status === 'completed').length / audits.length) * 100) || 0}%</div>
                                <div class="metric-label">Audit Completion Rate</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card success">
                            <div class="card-body metric-card">
                                <div class="metric-value">${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) || 0}%</div>
                                <div class="metric-label">Task Completion Rate</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card warning">
                            <div class="card-body metric-card">
                                <div class="metric-value">${vulnerabilities.filter(v => v.status === 'resolved').length}</div>
                                <div class="metric-label">Vulnerabilities Resolved</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card dashboard-card info">
                            <div class="card-body metric-card">
                                <div class="metric-value">${audits.reduce((sum, a) => sum + a.progress, 0) / audits.length || 0}%</div>
                                <div class="metric-label">Average Progress</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Audit Types Distribution</h5>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="auditTypesChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Task Status Overview</h5>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="taskStatusChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Performance Trends</h5>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="trendsChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Risk Assessment</h5>
                            </div>
                            <div class="card-body">
                                ${this.renderRiskAssessment(vulnerabilities)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize analytics charts
        setTimeout(() => {
            this.initializeAnalyticsCharts(audits, tasks, vulnerabilities);
        }, 100);
    }

    initializeAnalyticsCharts(audits, tasks, vulnerabilities) {
        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });

        // Audit Types Chart
        const auditTypes = {};
        audits.forEach(audit => {
            auditTypes[audit.type] = (auditTypes[audit.type] || 0) + 1;
        });

        const auditTypesCtx = document.getElementById('auditTypesChart');
        if (auditTypesCtx) {
            this.charts.auditTypes = new Chart(auditTypesCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(auditTypes).map(type => type.replace('_', ' ').toUpperCase()),
                    datasets: [{
                        data: Object.values(auditTypes),
                        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6c757d']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Task Status Chart
        const taskStatuses = {};
        tasks.forEach(task => {
            taskStatuses[task.status] = (taskStatuses[task.status] || 0) + 1;
        });

        const taskStatusCtx = document.getElementById('taskStatusChart');
        if (taskStatusCtx) {
            this.charts.taskStatus = new Chart(taskStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(taskStatuses).map(status => status.replace('_', ' ').toUpperCase()),
                    datasets: [{
                        data: Object.values(taskStatuses),
                        backgroundColor: ['#6c757d', '#0dcaf0', '#198754', '#dc3545']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Trends Chart (simulated data)
        const trendsCtx = document.getElementById('trendsChart');
        if (trendsCtx) {
            this.charts.trends = new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Audits Completed',
                            data: [2, 3, 1, 4, 2, 3],
                            borderColor: '#0d6efd',
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Vulnerabilities Found',
                            data: [5, 8, 3, 12, 6, 9],
                            borderColor: '#dc3545',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    renderRiskAssessment(vulnerabilities) {
        const riskLevels = {
            critical: vulnerabilities.filter(v => v.severity === 'critical').length,
            high: vulnerabilities.filter(v => v.severity === 'high').length,
            medium: vulnerabilities.filter(v => v.severity === 'medium').length,
            low: vulnerabilities.filter(v => v.severity === 'low').length
        };

        const totalRisk = riskLevels.critical * 4 + riskLevels.high * 3 + riskLevels.medium * 2 + riskLevels.low * 1;
        const maxRisk = vulnerabilities.length * 4;
        const riskPercentage = maxRisk > 0 ? Math.round((totalRisk / maxRisk) * 100) : 0;

        return `
            <div class="text-center mb-3">
                <div class="metric-value text-${riskPercentage > 75 ? 'danger' : riskPercentage > 50 ? 'warning' : 'success'}">
                    ${riskPercentage}%
                </div>
                <div class="metric-label">Overall Risk Level</div>
            </div>
            
            <div class="mb-3">
                <div class="d-flex justify-content-between">
                    <small>Critical</small>
                    <small>${riskLevels.critical}</small>
                </div>
                <div class="progress mb-2" style="height: 8px;">
                    <div class="progress-bar bg-danger" style="width: ${riskLevels.critical * 10}%"></div>
                </div>
                
                <div class="d-flex justify-content-between">
                    <small>High</small>
                    <small>${riskLevels.high}</small>
                </div>
                <div class="progress mb-2" style="height: 8px;">
                    <div class="progress-bar bg-warning" style="width: ${riskLevels.high * 10}%"></div>
                </div>
                
                <div class="d-flex justify-content-between">
                    <small>Medium</small>
                    <small>${riskLevels.medium}</small>
                </div>
                <div class="progress mb-2" style="height: 8px;">
                    <div class="progress-bar bg-info" style="width: ${riskLevels.medium * 10}%"></div>
                </div>
                
                <div class="d-flex justify-content-between">
                    <small>Low</small>
                    <small>${riskLevels.low}</small>
                </div>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar bg-success" style="width: ${riskLevels.low * 10}%"></div>
                </div>
            </div>
        `;
    }

    refreshAnalytics() {
        this.showNotification('Refreshing analytics...', 'info');
        this.showAnalytics();
    }

    exportAnalytics() {
        this.showNotification('Exporting analytics data...', 'info');
        setTimeout(() => {
            this.showNotification('Analytics data exported successfully!', 'success');
        }, 1500);
    }

    // Utility methods
    getStatusBadge(status) {
        return `<span class="badge status-${status.replace('_', '-')}">${status.replace('_', ' ').toUpperCase()}</span>`;
    }

    getPriorityBadge(priority) {
        return `<span class="badge priority-${priority}">${priority.toUpperCase()}</span>`;
    }

    getSeverityBadge(severity) {
        return `<span class="badge severity-${severity}">${severity.toUpperCase()}</span>`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show notification`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    refreshDashboard() {
        this.showDashboard();
        this.showNotification('Dashboard refreshed!', 'success');
    }

    showProfile() {
        this.showNotification('Profile management coming soon!', 'info');
    }

    renderFindingsList(findings) {
        if (findings.length === 0) {
            return '<p class="text-muted">No findings recorded for this audit.</p>';
        }

        return findings.map(finding => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6>${finding.title}</h6>
                            <p class="text-muted">${finding.description}</p>
                        </div>
                        <div>
                            ${this.getSeverityBadge(finding.severity)}
                            ${this.getStatusBadge(finding.status)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the application
const app = new AuditManagementSystem();

// Global functions for HTML onclick events
window.showDashboard = () => app.showDashboard();
window.showAudits = () => app.showAudits();
window.showTasks = () => app.showTasks();
window.showVulnerabilities = () => app.showVulnerabilities();
window.showCompliance = () => app.showCompliance();
window.showReports = () => app.showReports();
window.showAnalytics = () => app.showAnalytics();
window.showProfile = () => app.showProfile();
window.logout = () => app.logout();

// Make app globally available
window.app = app;