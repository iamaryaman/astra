// Application State
let currentUser = null;
let allDevices = [];
let filteredDevices = [];
let currentPage = 'landing';

// Mock Data
const mockUsers = [
    {"username": "admin", "password": "demo123"},
    {"username": "manager", "password": "astra2024"},
    {"username": "operator", "password": "gps123"}
];

const devicesData = [
    {
        "id": "GPS001",
        "deviceName": "Astra Tracker Pro",
        "userName": "Rajesh Kumar",
        "userId": "USR-2024-001",
        "emergencyContact": {
            "phone": "+91-9876543210",
            "email": "rajesh.kumar@email.com"
        },
        "status": "active",
        "location": {"lat": 28.6139, "lng": 77.2090},
        "lastUpdate": "2025-09-04T15:30:00"
    },
    {
        "id": "GPS002", 
        "deviceName": "Astra Guardian",
        "userName": "Priya Sharma",
        "userId": "USR-2024-002",
        "emergencyContact": {
            "phone": "+91-9123456789",
            "email": "priya.sharma@email.com"
        },
        "status": "active",
        "location": {"lat": 19.0760, "lng": 72.8777},
        "lastUpdate": "2025-09-04T16:15:00"
    },
    {
        "id": "GPS003",
        "deviceName": "Astra Secure+",
        "userName": "Amit Patel",
        "userId": "USR-2024-003", 
        "emergencyContact": {
            "phone": "+91-9987654321",
            "email": "amit.patel@email.com"
        },
        "status": "inactive",
        "location": {"lat": 22.5726, "lng": 88.3639},
        "lastUpdate": "2025-09-04T12:45:00"
    },
    {
        "id": "GPS004",
        "deviceName": "Astra Mini Track",
        "userName": "Sunita Devi",
        "userId": "USR-2024-004",
        "emergencyContact": {
            "phone": "+91-9876549876",
            "email": "sunita.devi@email.com"
        },
        "status": "active",
        "location": {"lat": 12.9716, "lng": 77.5946},
        "lastUpdate": "2025-09-04T16:45:00"
    },
    {
        "id": "GPS005",
        "deviceName": "Astra Fleet Pro",
        "userName": "Mohammad Ali",
        "userId": "USR-2024-005",
        "emergencyContact": {
            "phone": "+91-9654321987",
            "email": "mohammad.ali@email.com"
        },
        "status": "active",
        "location": {"lat": 26.9124, "lng": 75.7873},
        "lastUpdate": "2025-09-04T17:00:00"
    },
    {
        "id": "GPS006",
        "deviceName": "Astra Safety Shield",
        "userName": "Deepika Singh",
        "userId": "USR-2024-006",
        "emergencyContact": {
            "phone": "+91-9321654987",
            "email": "deepika.singh@email.com"
        },
        "status": "active",
        "location": {"lat": 17.3850, "lng": 78.4867},
        "lastUpdate": "2025-09-04T16:30:00"
    },
    {
        "id": "GPS007",
        "deviceName": "Astra Connect",
        "userName": "Ravi Gupta",
        "userId": "USR-2024-007",
        "emergencyContact": {
            "phone": "+91-9876123456",
            "email": "ravi.gupta@email.com"
        },
        "status": "inactive",
        "location": {"lat": 23.0225, "lng": 72.5714},
        "lastUpdate": "2025-09-04T14:20:00"
    },
    {
        "id": "GPS008",
        "deviceName": "Astra Watch",
        "userName": "Kavita Joshi",
        "userId": "USR-2024-008",
        "emergencyContact": {
            "phone": "+91-9123987654",
            "email": "kavita.joshi@email.com"
        },
        "status": "active",
        "location": {"lat": 21.1458, "lng": 79.0882},
        "lastUpdate": "2025-09-04T17:10:00"
    },
    {
        "id": "GPS009",
        "deviceName": "Astra Sentinel",
        "userName": "Vikram Reddy",
        "userId": "USR-2024-009",
        "emergencyContact": {
            "phone": "+91-9456789123",
            "email": "vikram.reddy@email.com"
        },
        "status": "active", 
        "location": {"lat": 15.2993, "lng": 74.1240},
        "lastUpdate": "2025-09-04T16:55:00"
    },
    {
        "id": "GPS010",
        "deviceName": "Astra Elite",
        "userName": "Anita Nair", 
        "userId": "USR-2024-010",
        "emergencyContact": {
            "phone": "+91-9789456123",
            "email": "anita.nair@email.com"
        },
        "status": "active",
        "location": {"lat": 9.9312, "lng": 76.2673},
        "lastUpdate": "2025-09-04T17:05:00"
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    allDevices = [...devicesData];
    filteredDevices = [...allDevices];
    
    // Ensure message overlay is hidden on init
    const messageOverlay = document.getElementById('message-overlay');
    if (messageOverlay) {
        messageOverlay.classList.add('hidden');
    }
    
    // Show landing page
    showPage('landing');
});

// Page Navigation Functions
function showPage(pageId) {
    try {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;
            
            // Initialize page-specific content
            if (pageId === 'dashboard') {
                initializeDashboard();
            }
        }
    } catch (error) {
        console.error('Error in showPage:', error);
    }
}

function navigateToSignIn() {
    try {
        showPage('signin');
    } catch (error) {
        console.error('Error navigating to sign in:', error);
    }
}

function navigateToLanding() {
    try {
        showPage('landing');
    } catch (error) {
        console.error('Error navigating to landing:', error);
    }
}

function navigateToDashboard() {
    try {
        if (currentUser) {
            showPage('dashboard');
        } else {
            showMessage('Please sign in first', 'error');
        }
    } catch (error) {
        console.error('Error navigating to dashboard:', error);
    }
}

// Authentication Functions
function handleSignIn(event) {
    event.preventDefault();
    
    try {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validate credentials against mock data
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user.username;
            showMessage('Sign in successful! Redirecting to dashboard...', 'success');
            
            setTimeout(() => {
                hideMessage();
                navigateToDashboard();
            }, 1500);
        } else {
            showMessage('Invalid username or password. Please check demo credentials.', 'error');
        }
    } catch (error) {
        console.error('Error in handleSignIn:', error);
        showMessage('An error occurred during sign in. Please try again.', 'error');
    }
}

function handleLogout() {
    try {
        currentUser = null;
        showMessage('Logged out successfully', 'success');
        
        setTimeout(() => {
            hideMessage();
            navigateToLanding();
        }, 1000);
    } catch (error) {
        console.error('Error in handleLogout:', error);
    }
}

// Dashboard Functions
function initializeDashboard() {
    try {
        if (!currentUser) {
            navigateToLanding();
            return;
        }
        
        // Update user welcome message
        const currentUserElement = document.getElementById('current-user');
        if (currentUserElement) {
            currentUserElement.textContent = currentUser;
        }
        
        // Reset filters
        const searchInput = document.getElementById('device-search');
        const statusFilter = document.getElementById('status-filter');
        
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = '';
        
        // Reset filtered devices
        filteredDevices = [...allDevices];
        
        // Render initial content
        updateDeviceStats();
        renderDevices();
        renderMapMarkers();
        
        // Start auto-refresh
        startAutoRefresh();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

function updateDeviceStats() {
    try {
        const activeCount = allDevices.filter(device => device.status === 'active').length;
        const totalCount = allDevices.length;
        
        const activeCountElement = document.getElementById('active-count');
        const totalCountElement = document.getElementById('total-count');
        
        if (activeCountElement) activeCountElement.textContent = activeCount;
        if (totalCountElement) totalCountElement.textContent = totalCount;
    } catch (error) {
        console.error('Error updating device stats:', error);
    }
}

function renderDevices() {
    try {
        const devicesGrid = document.getElementById('devices-grid');
        if (!devicesGrid) return;
        
        if (filteredDevices.length === 0) {
            devicesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">
                        No devices found matching your criteria.
                    </p>
                </div>
            `;
            return;
        }
        
        devicesGrid.innerHTML = filteredDevices.map(device => `
            <div class="device-card">
                <div class="device-header">
                    <div class="device-info">
                        <h4>${device.deviceName}</h4>
                        <span class="device-id">${device.id}</span>
                    </div>
                    <span class="device-status-badge ${device.status}">${device.status}</span>
                </div>
                
                <div class="device-details">
                    <div class="detail-row">
                        <span class="detail-label">Owner:</span>
                        <span class="detail-value">${device.userName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">User ID:</span>
                        <span class="detail-value">${device.userId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Last Update:</span>
                        <span class="detail-value">${formatDate(device.lastUpdate)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${device.location.lat.toFixed(4)}, ${device.location.lng.toFixed(4)}</span>
                    </div>
                    
                    <div class="emergency-contact">
                        <div class="emergency-title">🚨 Emergency Contact</div>
                        <div class="detail-row">
                            <span class="detail-label">Phone:</span>
                            <span class="detail-value">${device.emergencyContact.phone}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Email:</span>
                            <span class="detail-value">${device.emergencyContact.email}</span>
                        </div>
                    </div>
                </div>
                
                <div class="device-actions">
                    <button class="btn btn--outline btn--sm" onclick="viewDeviceDetails('${device.id}')">
                        View Details
                    </button>
                    <button class="btn btn--danger btn--sm" onclick="deactivateDevice('${device.id}')">
                        Deactivate
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering devices:', error);
    }
}

function renderMapMarkers() {
    try {
        const mapGrid = document.getElementById('map-grid');
        if (!mapGrid) return;
        
        mapGrid.innerHTML = filteredDevices.map(device => `
            <div class="map-marker ${device.status}" onclick="highlightDevice('${device.id}')" title="${device.deviceName} - ${device.userName}">
                <div class="marker-id">${device.id}</div>
                <div class="marker-status">${device.status}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering map markers:', error);
    }
}

// Filter and Search Functions
function filterDevices() {
    try {
        const searchInput = document.getElementById('device-search');
        const statusFilter = document.getElementById('status-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const statusFilterValue = statusFilter ? statusFilter.value : '';
        
        filteredDevices = allDevices.filter(device => {
            const matchesSearch = !searchTerm || 
                device.deviceName.toLowerCase().includes(searchTerm) ||
                device.id.toLowerCase().includes(searchTerm) ||
                device.userName.toLowerCase().includes(searchTerm) ||
                device.userId.toLowerCase().includes(searchTerm);
                
            const matchesStatus = !statusFilterValue || device.status === statusFilterValue;
            
            return matchesSearch && matchesStatus;
        });
        
        renderDevices();
        renderMapMarkers();
    } catch (error) {
        console.error('Error filtering devices:', error);
    }
}

// Device Management Functions
function viewDeviceDetails(deviceId) {
    try {
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            showMessage(`
                <strong>${device.deviceName}</strong><br>
                Owner: ${device.userName}<br>
                Status: ${device.status}<br>
                Location: ${device.location.lat.toFixed(4)}, ${device.location.lng.toFixed(4)}<br>
                Emergency: ${device.emergencyContact.phone}
            `, 'info');
        }
    } catch (error) {
        console.error('Error viewing device details:', error);
    }
}

function deactivateDevice(deviceId) {
    try {
        if (confirm('Are you sure you want to deactivate this device? This action cannot be undone.')) {
            // Remove device from arrays
            allDevices = allDevices.filter(device => device.id !== deviceId);
            filteredDevices = filteredDevices.filter(device => device.id !== deviceId);
            
            // Update display
            updateDeviceStats();
            renderDevices();
            renderMapMarkers();
            
            showMessage(`Device ${deviceId} has been successfully deactivated and removed.`, 'success');
        }
    } catch (error) {
        console.error('Error deactivating device:', error);
    }
}

function highlightDevice(deviceId) {
    try {
        // Remove existing highlights
        document.querySelectorAll('.device-card').forEach(card => {
            card.style.border = '';
        });
        
        // Find and highlight the device card
        const deviceCards = document.querySelectorAll('.device-card');
        deviceCards.forEach(card => {
            const deviceIdElement = card.querySelector('.device-id');
            if (deviceIdElement && deviceIdElement.textContent === deviceId) {
                card.style.border = '2px solid var(--color-primary)';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            showMessage(`Selected: ${device.deviceName} (${device.userName})`, 'info');
        }
    } catch (error) {
        console.error('Error highlighting device:', error);
    }
}

function updateMap() {
    try {
        const mapGrid = document.getElementById('map-grid');
        const updateButton = document.querySelector('[onclick="updateMap()"]');
        
        if (!mapGrid || !updateButton) return;
        
        // Show loading state
        mapGrid.classList.add('updating');
        updateButton.textContent = '🔄 Updating...';
        updateButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Update last update times for active devices
            allDevices.forEach(device => {
                if (device.status === 'active') {
                    device.lastUpdate = new Date().toISOString();
                    // Slightly randomize locations to simulate movement
                    device.location.lat += (Math.random() - 0.5) * 0.001;
                    device.location.lng += (Math.random() - 0.5) * 0.001;
                }
            });
            
            // Re-render components
            filterDevices(); // This will update both devices and map
            
            // Reset button state
            mapGrid.classList.remove('updating');
            updateButton.textContent = '🔄 Update Map';
            updateButton.disabled = false;
            
            showMessage('Map updated successfully! Device locations refreshed.', 'success');
        }, 2000);
    } catch (error) {
        console.error('Error updating map:', error);
    }
}

// Utility Functions
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Unknown';
    }
}

function showMessage(text, type = 'info') {
    try {
        const overlay = document.getElementById('message-overlay');
        const messageText = document.getElementById('message-text');
        
        if (!overlay || !messageText) return;
        
        messageText.innerHTML = text;
        overlay.classList.remove('hidden');
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 3000);
        }
    } catch (error) {
        console.error('Error showing message:', error);
    }
}

function hideMessage() {
    try {
        const overlay = document.getElementById('message-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding message:', error);
    }
}

// Auto-refresh functionality
let autoRefreshInterval = null;

function startAutoRefresh() {
    try {
        if (currentPage === 'dashboard' && currentUser) {
            autoRefreshInterval = setInterval(() => {
                // Update timestamps for active devices
                allDevices.forEach(device => {
                    if (device.status === 'active' && Math.random() > 0.7) {
                        device.lastUpdate = new Date().toISOString();
                    }
                });
                
                // Re-render if no filters are active
                const searchInput = document.getElementById('device-search');
                const statusFilter = document.getElementById('status-filter');
                
                const searchTerm = searchInput ? searchInput.value.trim() : '';
                const statusFilterValue = statusFilter ? statusFilter.value : '';
                
                if (!searchTerm && !statusFilterValue) {
                    renderDevices();
                }
            }, 30000); // Update every 30 seconds
        }
    } catch (error) {
        console.error('Error starting auto-refresh:', error);
    }
}

function stopAutoRefresh() {
    try {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
    } catch (error) {
        console.error('Error stopping auto-refresh:', error);
    }
}

// Event Listeners
document.addEventListener('keydown', function(event) {
    try {
        // ESC to close message overlay
        if (event.key === 'Escape') {
            hideMessage();
        }
        
        // Ctrl+/ for search focus (dashboard only)
        if (event.ctrlKey && event.key === '/' && currentPage === 'dashboard') {
            event.preventDefault();
            const searchInput = document.getElementById('device-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    } catch (error) {
        console.error('Error in keydown handler:', error);
    }
});

// Page visibility handling
document.addEventListener('visibilitychange', function() {
    try {
        if (document.hidden) {
            stopAutoRefresh();
        } else if (currentPage === 'dashboard') {
            startAutoRefresh();
        }
    } catch (error) {
        console.error('Error in visibility change handler:', error);
    }
});

// Clean up when leaving page
window.addEventListener('beforeunload', function() {
    try {
        stopAutoRefresh();
    } catch (error) {
        console.error('Error in beforeunload handler:', error);
    }
});