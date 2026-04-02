import React, { useState } from 'react';
import { ArrowLeft, Bus, MapPin, Clock, Navigation, AlertCircle, Phone, User, Route, Bell, TrendingUp, Calendar } from 'lucide-react';
import './BusTracking.css';

const BusTracking = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedBus, setSelectedBus] = useState('bus1');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001', busNo: 'bus1' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002', busNo: 'bus2' },
    ];

    const buses = {
        bus1: {
            id: 'bus1',
            number: 'GJ-01-AB-1234',
            route: 'Route A - Vadodara Central',
            driver: 'Mr. Ramesh Kumar',
            driverPhone: '+91 98765 43210',
            conductor: 'Mrs. Savita Patel',
            conductorPhone: '+91 98765 43211',
            capacity: 40,
            currentOccupancy: 32,
            status: 'on-route',
            currentLocation: 'Near Sayajigunj',
            nextStop: 'Alkapuri Circle',
            estimatedArrival: '15 minutes',
            speed: '35 km/h',
            lastUpdated: '2 mins ago',
            stops: [
                { name: 'School', time: '07:00 AM', status: 'completed', arrival: '07:00 AM' },
                { name: 'Fatehgunj', time: '07:15 AM', status: 'completed', arrival: '07:14 AM' },
                { name: 'Sayajigunj', time: '07:30 AM', status: 'current', arrival: 'Now' },
                { name: 'Alkapuri Circle', time: '07:45 AM', status: 'upcoming', arrival: '15 mins' },
                { name: 'Manjalpur', time: '08:00 AM', status: 'upcoming', arrival: '30 mins' },
                { name: 'School Arrival', time: '08:15 AM', status: 'upcoming', arrival: '45 mins' }
            ],
            schedule: {
                morning: { start: '07:00 AM', end: '08:15 AM' },
                afternoon: { start: '03:30 PM', end: '04:45 PM' }
            },
            coordinates: { lat: 22.3072, lng: 73.1812 }
        },
        bus2: {
            id: 'bus2',
            number: 'GJ-01-CD-5678',
            route: 'Route B - Vadodara West',
            driver: 'Mr. Suresh Joshi',
            driverPhone: '+91 98765 43212',
            conductor: 'Mr. Prakash Shah',
            conductorPhone: '+91 98765 43213',
            capacity: 45,
            currentOccupancy: 38,
            status: 'on-route',
            currentLocation: 'Near VIP Road',
            nextStop: 'Gotri Junction',
            estimatedArrival: '20 minutes',
            speed: '40 km/h',
            lastUpdated: '1 min ago',
            stops: [
                { name: 'School', time: '07:00 AM', status: 'completed', arrival: '07:00 AM' },
                { name: 'Akota', time: '07:20 AM', status: 'completed', arrival: '07:19 AM' },
                { name: 'VIP Road', time: '07:35 AM', status: 'current', arrival: 'Now' },
                { name: 'Gotri Junction', time: '07:50 AM', status: 'upcoming', arrival: '20 mins' },
                { name: 'Vasna', time: '08:05 AM', status: 'upcoming', arrival: '35 mins' },
                { name: 'School Arrival', time: '08:20 AM', status: 'upcoming', arrival: '50 mins' }
            ],
            schedule: {
                morning: { start: '07:00 AM', end: '08:20 AM' },
                afternoon: { start: '03:30 PM', end: '04:50 PM' }
            },
            coordinates: { lat: 22.2875, lng: 73.1619 }
        }
    };

    const currentStudent = students.find(s => s.id === selectedStudent);
    const currentBus = buses[currentStudent.busNo];

    const getStatusColor = (status) => {
        const colors = {
            'on-route': '#27ae60',
            'delayed': '#f39c12',
            'stopped': '#e74c3c',
            'completed': '#3498db',
            'current': '#9b59b6',
            'upcoming': '#95a5a6'
        };
        return colors[status] || '#95a5a6';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✓';
            case 'current': return '●';
            case 'upcoming': return '○';
            default: return '○';
        }
    };

    return (
        <div className="bus-tracking-page">
            {/* Header */}
            <div className="bus-tracking-header">
                <div className="bus-tracking-header-circle-1"></div>
                <div className="bus-tracking-header-circle-2"></div>

                <div className="bus-tracking-container">
                    <button className="bus-tracking-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="bus-tracking-header-content">
                        <div className="bus-tracking-header-emoji">🚌</div>
                        <h1 className="bus-tracking-header-title">Live Bus Tracking</h1>
                        <p className="bus-tracking-header-subtitle">
                            Real-Time GPS Tracking • Pickup/Drop Timings • Route Changes • Live Updates
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bus-tracking-main-content">
                {/* Student Selector */}
                <div className="bus-tracking-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="bus-tracking-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} - Bus: {buses[student.busNo].number}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="bus-tracking-stats-grid">
                    <div className="bus-tracking-stat-card">
                        <div className="bus-tracking-stat-icon" style={{ color: '#27ae60' }}>
                            <Bus size={40} />
                        </div>
                        <div className="bus-tracking-stat-number">{currentBus.number}</div>
                        <p className="bus-tracking-stat-label">Bus Number</p>
                    </div>

                    <div className="bus-tracking-stat-card">
                        <div className="bus-tracking-stat-icon" style={{ color: '#2ecc71' }}>
                            <Clock size={40} />
                        </div>
                        <div className="bus-tracking-stat-number">{currentBus.estimatedArrival}</div>
                        <p className="bus-tracking-stat-label">ETA Next Stop</p>
                    </div>

                    <div className="bus-tracking-stat-card">
                        <div className="bus-tracking-stat-icon" style={{ color: '#1b5e20' }}>
                            <TrendingUp size={40} />
                        </div>
                        <div className="bus-tracking-stat-number">{currentBus.speed}</div>
                        <p className="bus-tracking-stat-label">Current Speed</p>
                    </div>

                    <div className="bus-tracking-stat-card">
                        <div className="bus-tracking-stat-icon" style={{ color: '#145a32' }}>
                            <User size={40} />
                        </div>
                        <div className="bus-tracking-stat-number">{currentBus.currentOccupancy}/{currentBus.capacity}</div>
                        <p className="bus-tracking-stat-label">Occupancy</p>
                    </div>
                </div>

                {/* Live Status Card */}
                <div className="bus-tracking-live-status">
                    <div className="live-status-header">
                        <div className="live-indicator">
                            <span className="pulse"></span>
                            <span>Live Tracking</span>
                        </div>
                        <span className="last-updated">Updated: {currentBus.lastUpdated}</span>
                    </div>

                    <div className="live-status-content">
                        <div className="status-item">
                            <MapPin size={24} color="#27ae60" />
                            <div>
                                <p className="status-label">Current Location</p>
                                <p className="status-value">{currentBus.currentLocation}</p>
                            </div>
                        </div>

                        <div className="status-item">
                            <Navigation size={24} color="#2ecc71" />
                            <div>
                                <p className="status-label">Next Stop</p>
                                <p className="status-value">{currentBus.nextStop}</p>
                            </div>
                        </div>

                        <div className="status-item">
                            <AlertCircle size={24} color="#1b5e20" />
                            <div>
                                <p className="status-label">Bus Status</p>
                                <span
                                    className="bus-status-badge"
                                    style={{ background: getStatusColor(currentBus.status) }}
                                >
                                    {currentBus.status.charAt(0).toUpperCase() + currentBus.status.slice(1).replace('-', ' ')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bus-tracking-map-section">
                    <h2 className="section-title">Live Map View</h2>
                    <div className="map-placeholder">
                        <MapPin size={48} color="#27ae60" />
                        <p>Interactive map showing bus location</p>
                        <p className="map-coordinates">
                            Coordinates: {currentBus.coordinates.lat}, {currentBus.coordinates.lng}
                        </p>
                        <button className="view-map-button">
                            <Navigation size={18} />
                            View Full Map
                        </button>
                    </div>
                </div>

                {/* Route Timeline */}
                <div className="bus-tracking-route-section">
                    <h2 className="section-title">
                        <Route size={28} />
                        Route Timeline - {currentBus.route}
                    </h2>

                    <div className="route-timeline">
                        {currentBus.stops.map((stop, index) => (
                            <div key={index} className={`timeline-item ${stop.status}`}>
                                <div
                                    className="timeline-marker"
                                    style={{
                                        background: getStatusColor(stop.status),
                                        borderColor: getStatusColor(stop.status)
                                    }}
                                >
                                    {getStatusIcon(stop.status)}
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h4>{stop.name}</h4>
                                        <span className="timeline-time">{stop.time}</span>
                                    </div>
                                    <div className="timeline-arrival">
                                        <Clock size={14} />
                                        {stop.status === 'completed' ? `Arrived: ${stop.arrival}` :
                                            stop.status === 'current' ? 'Arriving Now' :
                                                `ETA: ${stop.arrival}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bus Info Cards */}
                <div className="bus-tracking-info-grid">
                    {/* Driver Info */}
                    <div className="bus-info-card">
                        <h3>Driver Information</h3>
                        <div className="info-item">
                            <User size={20} color="#27ae60" />
                            <div>
                                <p className="info-label">Name</p>
                                <p className="info-value">{currentBus.driver}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone size={20} color="#27ae60" />
                            <div>
                                <p className="info-label">Contact</p>
                                <p className="info-value">{currentBus.driverPhone}</p>
                            </div>
                        </div>
                        <button className="contact-button">
                            <Phone size={16} />
                            Call Driver
                        </button>
                    </div>

                    {/* Conductor Info */}
                    <div className="bus-info-card">
                        <h3>Conductor Information</h3>
                        <div className="info-item">
                            <User size={20} color="#2ecc71" />
                            <div>
                                <p className="info-label">Name</p>
                                <p className="info-value">{currentBus.conductor}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone size={20} color="#2ecc71" />
                            <div>
                                <p className="info-label">Contact</p>
                                <p className="info-value">{currentBus.conductorPhone}</p>
                            </div>
                        </div>
                        <button className="contact-button">
                            <Phone size={16} />
                            Call Conductor
                        </button>
                    </div>

                    {/* Schedule Info */}
                    <div className="bus-info-card">
                        <h3>Bus Schedule</h3>
                        <div className="schedule-item">
                            <Calendar size={20} color="#1b5e20" />
                            <div>
                                <p className="info-label">Morning Pickup</p>
                                <p className="info-value">{currentBus.schedule.morning.start} - {currentBus.schedule.morning.end}</p>
                            </div>
                        </div>
                        <div className="schedule-item">
                            <Calendar size={20} color="#1b5e20" />
                            <div>
                                <p className="info-label">Afternoon Drop</p>
                                <p className="info-value">{currentBus.schedule.afternoon.start} - {currentBus.schedule.afternoon.end}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bus-tracking-notifications">
                    <h2 className="section-title">
                        <Bell size={28} />
                        Recent Notifications
                    </h2>
                    <div className="notifications-grid">
                        <div className="notification-card">
                            <div className="notification-icon">
                                <Clock size={20} color="#27ae60" />
                            </div>
                            <div className="notification-content">
                                <h4>Bus on Schedule</h4>
                                <p>Bus is running on time. Expected arrival at your stop in 15 minutes.</p>
                                <span className="notification-time">5 mins ago</span>
                            </div>
                        </div>

                        <div className="notification-card">
                            <div className="notification-icon">
                                <MapPin size={20} color="#2ecc71" />
                            </div>
                            <div className="notification-content">
                                <h4>Approaching Your Stop</h4>
                                <p>Bus will reach {currentBus.nextStop} in approximately 15 minutes.</p>
                                <span className="notification-time">10 mins ago</span>
                            </div>
                        </div>

                        <div className="notification-card">
                            <div className="notification-icon">
                                <AlertCircle size={20} color="#f39c12" />
                            </div>
                            <div className="notification-content">
                                <h4>Route Update</h4>
                                <p>Minor traffic on route. Estimated delay of 5 minutes.</p>
                                <span className="notification-time">30 mins ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bus-tracking-cta-section">
                    <div className="bus-tracking-cta-decorative"></div>
                    <h2>Need Assistance?</h2>
                    <p>Contact transport department for route changes or concerns</p>
                    <div className="bus-tracking-cta-buttons">
                        <button className="bus-tracking-cta-button-primary">
                            <Phone size={18} />
                            Call Transport Office
                        </button>
                        <button className="bus-tracking-cta-button-secondary">
                            <Bell size={18} />
                            Enable Notifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusTracking;