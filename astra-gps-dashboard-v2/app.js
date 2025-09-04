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
    console.log('Application initializing...');
    
    // Initialize data
    allDevices = [...devicesData];
    filteredDevices = [...allDevices];
    
    // Ensure message overlay is hidden on init
    const messageOverlay = document.getElementById('message-overlay');
    const confirmDialog = document.getElementById('confirm-dialog');
    if (messageOverlay) {
        messageOverlay.classList.add('hidden');
    }
    if (confirmDialog) {
        confirmDialog.classList.add('hidden');
    }
    
    // Show landing page
    showPage('landing');
    console.log('Application initialized successfully');
});

// Page Navigation Functions
function showPage(pageId) {
    try {
        console.log(`Navigating to page: ${pageId}`);
        
        // Hide all pages first
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            console.log(`Hiding page: ${page.id}`);
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;
            console.log(`Showing page: ${targetPage.id}`);
            
            // Initialize page-specific content
            if (pageId === 'dashboard') {
                initializeDashboard();
            }
        } else {
            console.error(`Page not found: ${pageId}-page`);
        }
    } catch (error) {
        console.error('Error in showPage:', error);
    }
}

// Global navigation functions - ensuring they're available
window.navigateToSignIn = function() {
    try {
        console.log('Navigate to Sign In clicked');
        showPage('signin');
    } catch (error) {
        console.error('Error navigating to sign in:', error);
    }
};

window.navigateToLanding = function() {
    try {
        console.log('Navigate to Landing clicked');
        showPage('landing');
    } catch (error) {
        console.error('Error navigating to landing:', error);
    }
};

window.navigateToDashboard = function() {
    try {
        console.log('Navigate to Dashboard clicked');
        if (currentUser) {
            showPage('dashboard');
        } else {
            showMessage('Please sign in first', 'error');
        }
    } catch (error) {
        console.error('Error navigating to dashboard:', error);
    }
};

// Authentication Functions
window.handleSignIn = function(event) {
    event.preventDefault();
    
    try {
        console.log('Sign in form submitted');
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        console.log(`Attempting login with username: ${username}`);
        
        // Validate credentials against mock data
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user.username;
            console.log(`Login successful for: ${currentUser}`);
            showMessage('Sign in successful! Redirecting to dashboard...', 'success');
            
            setTimeout(() => {
                hideMessage();
                navigateToDashboard();
            }, 1500);
        } else {
            console.log('Login failed - invalid credentials');
            showMessage('Invalid username or password. Please check demo credentials.', 'error');
        }
    } catch (error) {
        console.error('Error in handleSignIn:', error);
        showMessage('An error occurred during sign in. Please try again.', 'error');
    }
};

window.handleLogout = function() {
    try {
        console.log('Logout clicked');
        currentUser = null;
        showMessage('Logged out successfully', 'success');
        
        setTimeout(() => {
            hideMessage();
            navigateToLanding();
        }, 1000);
    } catch (error) {
        console.error('Error in handleLogout:', error);
    }
};

// Dashboard Functions
function initializeDashboard() {
    try {
        console.log('Initializing dashboard...');
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
        console.log('Dashboard initialized successfully');
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

window.openGoogleMaps = function(deviceId) {
    try {
        console.log(`Opening Google Maps for device: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            const googleMapsUrl = `https://www.google.com/maps?q=${device.location.lat},${device.location.lng}`;
            window.open(googleMapsUrl, '_blank');
            showMessage(`Opening location for ${device.deviceName} on Google Maps`, 'info');
        }
    } catch (error) {
        console.error('Error opening Google Maps:', error);
    }
};

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
            <div class="device-card" onclick="openGoogleMaps('${device.id}')">
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
                
                <div class="device-actions" onclick="event.stopPropagation()">
                    <button class="btn btn--toggle btn--sm ${device.status === 'inactive' ? 'inactive' : ''}" onclick="toggleDeviceStatus('${device.id}')">
                        ${device.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button class="btn btn--danger btn--sm" onclick="confirmDeleteDevice('${device.id}')">
                        Delete
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
            <div class="map-marker ${device.status}" onclick="openGoogleMaps('${device.id}')" title="${device.deviceName} - ${device.userName} (Click to view on Google Maps)">
                <div class="marker-id">${device.id}</div>
                <div class="marker-status">${device.status}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering map markers:', error);
    }
}

// Filter and Search Functions
window.filterDevices = function() {
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
};

// Device Management Functions
window.toggleDeviceStatus = function(deviceId) {
    try {
        console.log(`Toggling status for device: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            const newStatus = device.status === 'active' ? 'inactive' : 'active';
            device.status = newStatus;
            device.lastUpdate = new Date().toISOString();
            
            // Update displays
            updateDeviceStats();
            renderDevices();
            renderMapMarkers();
            
            showMessage(`Device ${deviceId} status changed to ${newStatus}`, 'success');
        }
    } catch (error) {
        console.error('Error toggling device status:', error);
    }
};

window.confirmDeleteDevice = function(deviceId) {
    try {
        console.log(`Confirming delete for device: ${deviceId}`);
        const device = allDevices.find(d => d.id === deviceId);
        if (device) {
            const confirmDialog = document.getElementById('confirm-dialog');
            const confirmText = document.getElementById('confirm-text');
            const confirmYes = document.getElementById('confirm-yes');
            
            if (confirmDialog && confirmText && confirmYes) {
                confirmText.innerHTML = `Are you sure you want to permanently delete <strong>${device.deviceName}</strong>?<br>This action cannot be undone.`;
                
                // Remove existing click handlers
                confirmYes.onclick = null;
                
                // Add new click handler
                confirmYes.onclick = () => deleteDevice(deviceId);
                
                confirmDialog.classList.remove('hidden');
            }
        }
    } catch (error) {
        console.error('Error showing confirmation dialog:', error);
    }
};

window.deleteDevice = function(deviceId) {
    try {
        console.log(`Deleting device: ${deviceId}`);
        // Remove device from arrays
        allDevices = allDevices.filter(device => device.id !== deviceId);
        filteredDevices = filteredDevices.filter(device => device.id !== deviceId);
        
        // Update display
        updateDeviceStats();
        renderDevices();
        renderMapMarkers();
        
        hideConfirmDialog();
        showMessage(`Device ${deviceId} has been permanently deleted.`, 'success');
    } catch (error) {
        console.error('Error deleting device:', error);
    }
};

window.updateMap = function() {
    try {
        console.log('Updating map...');
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
};

// Dialog Functions
window.hideConfirmDialog = function() {
    try {
        const confirmDialog = document.getElementById('confirm-dialog');
        if (confirmDialog) {
            confirmDialog.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding confirm dialog:', error);
    }
};

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
        
        // Auto-hide success and info messages
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                hideMessage();
            }, 3000);
        }
    } catch (error) {
        console.error('Error showing message:', error);
    }
}

window.hideMessage = function() {
    try {
        const overlay = document.getElementById('message-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding message:', error);
    }
};

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
        // ESC to close message overlay or confirm dialog
        if (event.key === 'Escape') {
            hideMessage();
            hideConfirmDialog();
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