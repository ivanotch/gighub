import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
    Camera,
    Loader2,
    CheckCircle,
    XCircle,
    RotateCw,
    Search,
    Navigation,
    Star,
    MapPin,
    Clock,
    Briefcase,
    Shield,
} from "lucide-react";

const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const [lng1, lat1] = coord1;
    const [lng2, lat2] = coord2;

    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // Distance in meters
};

// Function to format distance for display
const formatDistance = (meters: number): string => {
    if (meters < 1000) {
        return `${meters} meters`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
};

type Worker = {
    id: number;
    avatar: string;
    name: string;
    title: string;
    location: string;
    jobSuccess: string;
    jobCount: string;
    tags: string[];
    description: string;
    availability: string;
    status: string;
    workingOn: string;
    historyStatus: string;
    rating: number;
    hourlyRate: string;
    experience: string;
    verified: boolean;
    responseTime: string;
};

const workers: Worker[] = [
    { 
        id: 1, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", 
        name: "Sophia R.", 
        title: "Cleaning | E-Commerce", 
        location: "Quezon City", 
        jobSuccess: "92%", 
        jobCount: "48", 
        tags: ["Packing", "Shipping", "Inventory Management", "Restocking", "Order Fulfillment"], 
        description: "Reliable gig worker handling multiple tasks efficiently. Specializes in e-commerce operations with attention to detail.", 
        availability: "Available Now", 
        status: "highest success", 
        workingOn: "Pack 30 Medium sized orders", 
        historyStatus: "Cancelled",
        rating: 4.8,
        hourlyRate: "₱65/hr",
        experience: "2 years",
        verified: true,
        responseTime: "Within 5 mins"
    },
    { 
        id: 2, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel", 
        name: "Daniel M.", 
        title: "E-Commerce | Digital Tasks", 
        location: "Makati", 
        jobSuccess: "85%", 
        jobCount: "60", 
        tags: ["Labeling", "Sorting", "Inventory Tracking", "Quality Check", "Delivery"], 
        description: "Experienced in warehouse operations and e-commerce order fulfillment. Quick learner with excellent time management.", 
        availability: "Available Now", 
        status: "top rated", 
        workingOn: "Manage Inventory", 
        historyStatus: "completed",
        rating: 4.6,
        hourlyRate: "₱70/hr",
        experience: "1 year",
        verified: true,
        responseTime: "Within 10 mins"
    },
    { 
        id: 3, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava", 
        name: "Ava L.", 
        title: "Cleaning | Digital Tasks", 
        location: "Pasig", 
        jobSuccess: "90%", 
        jobCount: "52", 
        tags: ["Packing", "Labeling", "Inventory Audit", "Restocking", "Shipping"], 
        description: "Efficient operations specialist for e-commerce tasks. Known for quality work and timely completion.", 
        availability: "Available Now", 
        status: "highest success", 
        workingOn: "Label and Pack 100 Items for shipping", 
        historyStatus: "completed",
        rating: 4.7,
        hourlyRate: "₱62/hr",
        experience: "1.5 years",
        verified: true,
        responseTime: "Within 3 mins"
    },
    { 
        id: 4, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan", 
        name: "Ethan C.", 
        title: "Delivery | E-Commerce", 
        location: "Taguig", 
        jobSuccess: "88%", 
        jobCount: "41", 
        tags: ["Order Picking", "Packaging", "Labeling", "Inventory Management", "Delivery"], 
        description: "Dedicated fulfillment specialist ready to handle multiple short fulfillment tasks. Strong work ethic.", 
        availability: "Available Now", 
        status: "most experienced", 
        workingOn: "Manage Order Processing", 
        historyStatus: "Cancelled",
        rating: 4.5,
        hourlyRate: "₱68/hr",
        experience: "9 months",
        verified: false,
        responseTime: "Within 15 mins"
    },
    { 
        id: 5, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella", 
        name: "Isabella P.", 
        title: "Digital Tasks | E-Commerce", 
        location: "Mandaluyong", 
        jobSuccess: "95%", 
        jobCount: "70", 
        tags: ["Packing", "Sorting", "Stock Replenishment", "Shipping", "Quality Control"], 
        description: "Organized and dependable logistics coordinator. Excellent communication skills and reliability.", 
        availability: "Available Now", 
        status: "none", 
        workingOn: "Pack and Label 34 large items for shipping", 
        historyStatus: "completed",
        rating: 4.9,
        hourlyRate: "₱75/hr",
        experience: "1 year",
        verified: true,
        responseTime: "Within 2 mins"
    }
];

export default function GigbossMap() {
    const router = useRouter();

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker | null>(null);
    const gigMarkerRef = useRef<maplibregl.Marker | null>(null);
    const routeLineRef = useRef<any>(null);
    const routeSourceRef = useRef<maplibregl.Source | null>(null);
    const [loadingMap, setLoadingMap] = useState(true);
    const [distance, setDistance] = useState<number | null>(null);
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    const [status, setStatus] = useState(false);
    const [isSearching, setIsSearching] = useState(true);
    const [hasFoundGig, setHasFoundGig] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [gigLocation, setGigLocation] = useState<[number, number] | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [showFaceModal, setShowFaceModal] = useState(false);
    const [verificationStep, setVerificationStep] = useState<
        "ready" | "capturing" | "confirming" | "success"
    >("ready");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        if (showFaceModal) {
            startSearchingForGig();
        }
    }, [showFaceModal]);

    // ===== Map Initialization =====
    useEffect(() => {
        if (!mapContainer.current || mapInstance.current) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const location: [number, number] = [longitude, latitude];
                setCurrentLocation(location);

                mapInstance.current = new maplibregl.Map({
                    container: mapContainer.current as HTMLElement,
                    style: {
                        version: 8,
                        sources: {
                            "raster-tiles": {
                                type: "raster",
                                tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                                tileSize: 256,
                                attribution: "© OpenStreetMap contributors",
                            },
                        },
                        layers: [
                            {
                                id: "osm-layer",
                                type: "raster",
                                source: "raster-tiles",
                                minzoom: 0,
                                maxzoom: 19,
                            },
                        ],
                    },
                    center: location,
                    zoom: 15,
                });

                mapInstance.current.on("load", () => setLoadingMap(false));

                // Add current location marker
                markerRef.current = new maplibregl.Marker({
                    color: "#3b82f6",
                    draggable: false
                })
                    .setLngLat(location)
                    .addTo(mapInstance.current);

                // Add popup to current location marker
                const popup = new maplibregl.Popup({ offset: 25 })
                    .setHTML('<div class="font-semibold">Your Location</div>');
                markerRef.current.setPopup(popup);

                // Watch for location updates
                navigator.geolocation.watchPosition((pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newLocation: [number, number] = [longitude, latitude];
                    setCurrentLocation(newLocation);
                    markerRef.current?.setLngLat(newLocation);
                    mapInstance.current?.setCenter(newLocation);

                    // Update route if gig is found
                    if (hasFoundGig && gigLocation) {
                        updateRoute(newLocation, gigLocation);
                    }
                });
            },
            (err) => console.error("Location error:", err),
            { enableHighAccuracy: true }
        );

        return () => mapInstance.current?.remove();
    }, []);

    // ===== Route Functions =====
    const addGigMarker = (location: [number, number]) => {
        if (!mapInstance.current || !currentLocation) return;

        // Remove existing gig marker if any
        if (gigMarkerRef.current) {
            gigMarkerRef.current.remove();
        }

        // Calculate distance
        const dist = calculateDistance(currentLocation, location);

        // Add new gig marker with different color
        gigMarkerRef.current = new maplibregl.Marker({
            color: "#10b981", // Green color
            draggable: false
        })
            .setLngLat(location)
            .addTo(mapInstance.current);

        // Add popup to gig marker with distance info
        const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML(`
            <div class="p-2 min-w-[200px]">
                <div class="font-bold text-green-700">Available Gigdaddy found!</div>
                <div class="text-sm text-gray-600 mt-1">Shopee Packing of 50 orders</div>
                <div class="text-xs text-gray-500">2 hours • ₱65/hr</div>
                <div class="mt-2 p-2 bg-gray-50 rounded text-sm">
                    <div class="font-medium text-gray-700">Distance from you:</div>
                    <div class="text-green-600 font-bold">${formatDistance(dist)}</div>
                </div>
                <button 
                    onclick="document.dispatchEvent(new CustomEvent('accept-gig'))"
                    class="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 w-full font-medium"
                >
                    Accept Gig
                </button>
            </div>
        `);

        gigMarkerRef.current.setPopup(popup);

        // Add event listener for the accept button in the popup
        const acceptHandler = () => acceptGig();
        document.addEventListener('accept-gig', acceptHandler);

        // Clean up event listener when marker is removed
        gigMarkerRef.current.getElement().dataset.acceptHandler = acceptHandler.toString();
    };

    const createRoute = (start: [number, number], end: [number, number]) => {
        if (!mapInstance.current) return;

        // Remove existing route if any
        if (routeLineRef.current) {
            mapInstance.current.removeLayer(routeLineRef.current.id);
        }
        if (routeSourceRef.current) {
            mapInstance.current.removeSource(routeSourceRef.current.id);
        }

        // Create a GeoJSON line string for the route
        const routeGeoJSON = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [start, end]
            },
            properties: {}
        };

        // Add source and layer for the route
        mapInstance.current.addSource('route', {
            type: 'geojson',
            data: routeGeoJSON as any
        });

        mapInstance.current.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#f59e0b', // Amber color
                'line-width': 4,
                'line-dasharray': [2, 2]
            }
        });

        routeLineRef.current = mapInstance.current.getLayer('route-line') as any;
        routeSourceRef.current = mapInstance.current.getSource('route') as any;

        // Fit map to show both markers
        const bounds = new maplibregl.LngLatBounds()
            .extend(start)
            .extend(end);

        mapInstance.current.fitBounds(bounds, {
            padding: 100,
            duration: 1000
        });
    };

    const updateRoute = (start: [number, number], end: [number, number]) => {
        if (!mapInstance.current || !routeSourceRef.current) return;

        const routeGeoJSON = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [start, end]
            },
            properties: {}
        };

        (routeSourceRef.current as any).setData(routeGeoJSON);
    };

    const findNearbyGigLocation = (currentLoc: [number, number]): [number, number] => {
        // Generate a random nearby location (within ~1km)
        const [lng, lat] = currentLoc;
        const randomDistance = 0.01; // ~1km in degrees
        const randomAngle = Math.random() * 2 * Math.PI;

        const newLng = lng + Math.cos(randomAngle) * randomDistance;
        const newLat = lat + Math.sin(randomAngle) * randomDistance;

        return [newLng, newLat];
    };

    // ===== Face Verification Functions =====
    const startSearchingForGig = () => {
        setIsSearching(true);
        setHasFoundGig(false);
        setDistance(null);
        setSelectedWorker(null);

        // Clear any existing timer
        if (searchTimer) {
            clearTimeout(searchTimer);
        }

        // Set a timer for 3 seconds
        const timer = setTimeout(() => {
            if (currentLocation) {
                // Generate a random nearby gig location
                const gigLoc = findNearbyGigLocation(currentLocation);
                setGigLocation(gigLoc);

                // Calculate distance
                const dist = calculateDistance(currentLocation, gigLoc);
                setDistance(dist);

                // Randomly select a worker
                const randomWorker = workers[Math.floor(Math.random() * workers.length)];
                setSelectedWorker(randomWorker);

                // Add gig marker to map
                addGigMarker(gigLoc);

                // Create route between current location and gig
                createRoute(currentLocation, gigLoc);

                // Update state
                setHasFoundGig(true);
                setIsSearching(false);
            }
        }, 3000);

        setSearchTimer(timer);
    };

    // Update the stopSearching function to clear the timer
    const stopSearching = () => {
        setIsSearching(false);
        setStatus(false);
        setHasFoundGig(false);
        setDistance(null);
        setSelectedWorker(null);

        // Clear search timer
        if (searchTimer) {
            clearTimeout(searchTimer);
            setSearchTimer(null);
        }

        // Remove gig marker and route
        if (gigMarkerRef.current) {
            gigMarkerRef.current.remove();
            gigMarkerRef.current = null;
        }
        if (mapInstance.current) {
            if (routeLineRef.current) {
                mapInstance.current.removeLayer(routeLineRef.current.id);
                routeLineRef.current = null;
            }
            if (routeSourceRef.current) {
                mapInstance.current.removeSource(routeSourceRef.current.id);
                routeSourceRef.current = null;
            }
        }
    };

    // Accept gig function
    const acceptGig = () => {
        alert("Gig accepted! You're now booked for the packing of 50 shopee orders.");
        router.push("/gigdaddy/myjobs")
    };

    // ===== JSX =====
    return (
        <div className="relative w-full h-[80vh]">
            {/* Map container */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Map loader */}
            {loadingMap && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 border-gray-300" />
                </div>
            )}

            {/* Gig found overlay with worker profile */}
            {hasFoundGig && selectedWorker && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white border border-gray-200 rounded-xl p-4 shadow-xl min-w-[320px] max-w-[400px]">
                    <div className="flex flex-col gap-4">
                        {/* Header with job info */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={20} />
                                <h3 className="font-semibold text-gray-800">Gigdaddy Found!</h3>
                            </div>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available Now</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm">Shopee Packing of 50 orders • 2 hours • {selectedWorker.hourlyRate}</p>

                        {/* Worker Profile Card */}
                        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                            {/* Profile Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative">
                                    <img 
                                        src={selectedWorker.avatar} 
                                        alt={selectedWorker.name}
                                        className="w-14 h-14 rounded-full border-2 border-white shadow"
                                    />
                                    {selectedWorker.verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                            <Shield className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900">{selectedWorker.name}</h4>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                            {selectedWorker.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{selectedWorker.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                            <span className="text-xs font-semibold">{selectedWorker.rating}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">•</span>
                                        <span className="text-xs text-gray-500">{selectedWorker.jobCount} jobs</span>
                                        <span className="text-xs text-gray-500">•</span>
                                        <span className="text-xs text-gray-500">{selectedWorker.jobSuccess} success</span>
                                    </div>
                                </div>
                            </div>

                            {/* Worker Details Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="text-sm font-medium">{selectedWorker.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Experience</p>
                                        <p className="text-sm font-medium">{selectedWorker.experience}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Response Time</p>
                                        <p className="text-sm font-medium">{selectedWorker.responseTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Distance Information */}
                            {distance !== null && (
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Navigation className="text-blue-600" size={18} />
                                            <p className="text-sm font-medium text-gray-800">Distance from you:</p>
                                        </div>
                                        <p className="text-lg font-bold text-blue-700">{formatDistance(distance)}</p>
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        Estimated travel time: {Math.ceil(distance / 80)} minutes
                                    </p>
                                </div>
                            )}

                            {/* Skills/Tags */}
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-2">Skills & Expertise:</p>
                                <div className="flex flex-wrap gap-1">
                                    {selectedWorker.tags.slice(0, 4).map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {selectedWorker.tags.length > 4 && (
                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                            +{selectedWorker.tags.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={acceptGig}
                                    className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={16} />
                                    Accept & Hire
                                </button>
                                <button
                                    onClick={stopSearching}
                                    className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        {/* Worker Description */}
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-800 mb-1">About {selectedWorker.name.split(' ')[0]}:</p>
                            <p>{selectedWorker.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Searching animation overlay */}
            {isSearching && (
                <div className="absolute inset-0 z-40 pointer-events-none">
                    {/* Floating search icon in the middle of map */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            {/* Pulsing circle animation */}
                            <div className="absolute inset-0 animate-ping bg-blue-500 rounded-full opacity-20 w-16 h-16"></div>
                            <div className="relative flex items-center bg-blue-500 rounded-full px-4 shadow-xl">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                                <p className="text-white text-lg font-semibold px-4 py-2 rounded-lg">
                                    Searching for the nearest gigdaddy
                                </p>
                            </div>
                        </div>

                        {/* Searching text */}
                        <div className="mt-4 text-center">
                            <p className="text-white/80 text-sm mt-2 bg-black/40 px-3 py-1 rounded-md">
                                Finding gigdaddy near you
                            </p>
                        </div>
                    </div>

                    {/* Multiple floating search icons around the map */}
                    <div className="absolute top-1/4 left-1/4 animate-bounce">
                        <Search className="w-6 h-6 text-blue-500 opacity-60" />
                    </div>
                    <div className="absolute top-1/3 right-1/3 animate-bounce delay-300">
                        <Search className="w-5 h-5 text-blue-400 opacity-50" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-500">
                        <Search className="w-7 h-7 text-blue-300 opacity-40" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-700">
                        <Search className="w-4 h-4 text-blue-600 opacity-70" />
                    </div>
                    <div className="absolute top-1/2 left-1/4 animate-bounce delay-1000">
                        <Search className="w-5 h-5 text-blue-500 opacity-60" />
                    </div>
                </div>
            )}

            {/* Floating button */}
            {!isSearching && !hasFoundGig ? (
                <button
                    className="absolute bottom-15 right-15 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 z-50 flex items-center gap-2"
                    onClick={startSearchingForGig}
                >
                    <Search size={20} />
                    Search for a gig
                </button>
            ) : isSearching ? (
                <button
                    className="absolute bottom-15 right-15 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-500 z-50 flex items-center gap-2"
                    onClick={stopSearching}
                >
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Searching...</span>
                        <span className="text-sm opacity-80">(3s)</span>
                    </div>
                </button>
            ) : (
                <div className="absolute bottom-15 right-15 flex gap-3 z-50">
                    <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-500 flex items-center gap-2"
                        onClick={stopSearching}
                    >
                        <XCircle size={20} />
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}