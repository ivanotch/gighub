// app/gigdaddy/myCurrentJob/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
    MapPin,
    Clock,
    DollarSign,
    Calendar,
    CheckCircle,
    ArrowLeft,
    Navigation,
    Package,
    User
} from "lucide-react";
import Link from "next/link";

interface GigData {
    id: string;
    title: string;
    description: string;
    duration: string;
    payRate: string;
    location: [number, number];
    acceptedAt: string;
    status: string;
}

export default function MyCurrentJob() {
    const router = useRouter();
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const [currentGig, setCurrentGig] = useState<GigData | null>(null);
    const [loading, setLoading] = useState(true);

    // Load gig data from localStorage
    useEffect(() => {
        const gigData = localStorage.getItem('currentGig');
        if (gigData) {
            setCurrentGig(JSON.parse(gigData));
        } else {
            // If no gig data, redirect back to map
            router.push('/gigdaddy');
        }
    }, [router]);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || !currentGig?.location) return;

        // Get user's current location for the map center
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userLocation: [number, number] = [pos.coords.longitude, pos.coords.latitude];

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
                    center: userLocation,
                    zoom: 13,
                });

                mapInstance.current.on("load", () => {
                    setLoading(false);
                    
                    // Add user location marker
                    new maplibregl.Marker({
                        color: "#3b82f6",
                        draggable: false
                    })
                        .setLngLat(userLocation)
                        .addTo(mapInstance.current!)
                        .setPopup(new maplibregl.Popup({ offset: 25 })
                            .setHTML('<div class="font-semibold">Your Location</div>'));

                    // Add gig location marker
                    new maplibregl.Marker({
                        color: "#10b981",
                        draggable: false
                    })
                        .setLngLat(currentGig.location)
                        .addTo(mapInstance.current!)
                        .setPopup(new maplibregl.Popup({ offset: 25 })
                            .setHTML(`
                                <div class="p-2">
                                    <div class="font-bold text-green-700">Gig Location</div>
                                    <div class="text-sm text-gray-600">${currentGig.title}</div>
                                </div>
                            `));

                    // Create route between user and gig
                    createRoute(userLocation, currentGig.location);
                });
            },
            (err) => {
                console.error("Location error:", err);
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );

        return () => mapInstance.current?.remove();
    }, [currentGig]);

    const createRoute = (start: [number, number], end: [number, number]) => {
        if (!mapInstance.current) return;

        const routeGeoJSON = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [start, end]
            },
            properties: {}
        };

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
                'line-color': '#f59e0b',
                'line-width': 4,
                'line-dasharray': [2, 2]
            }
        });

        // Fit map to show both markers
        const bounds = new maplibregl.LngLatBounds()
            .extend(start)
            .extend(end);

        mapInstance.current.fitBounds(bounds, {
            padding: 100,
            duration: 1000
        });
    };

    const completeJob = () => {
        if (confirm("Mark this job as completed? You'll be paid once verified.")) {
            // Update job status
            const updatedGig = { ...currentGig!, status: "completed", completedAt: new Date().toISOString() };
            localStorage.setItem('currentGig', JSON.stringify(updatedGig));
            
            alert("Job marked as completed! Payment will be processed within 24 hours.");
            router.push('/gigdaddy/myjobs');
        }
    };

    if (!currentGig) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 border-gray-300 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/gigdaddy"
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={24} className="text-gray-700" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Current Job</h1>
                                <p className="text-gray-600 text-sm">Active • In progress</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Job Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Map Section */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Navigation size={20} className="text-blue-600" />
                                    Job Location & Directions
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Follow the route to reach your gig location
                                </p>
                            </div>
                            <div className="relative h-[400px]">
                                <div ref={mapContainer} className="w-full h-full" />
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 border-b-2 border-gray-300" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                        <span className="text-sm text-gray-700">Your location</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                        <span className="text-sm text-gray-700">Gig location</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Instructions */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Instructions</h2>
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    <h3 className="font-medium text-blue-800 mb-2">📦 Packing Requirements:</h3>
                                    <ul className="text-gray-700 space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            Pack items according to size and fragility
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            Use appropriate packaging materials provided
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            Label each package with the provided stickers
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            Sort packages by delivery priority
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h3 className="font-medium text-gray-800 mb-2">📍 Location Details:</h3>
                                    <p className="text-gray-700">
                                        Report to the warehouse reception desk. Ask for Manager John Doe.
                                        Bring your ID for verification upon arrival.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Job Info & Actions */}
                    <div className="space-y-6">
                        {/* Job Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Package size={24} className="text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{currentGig.title}</h2>
                                    <p className="text-gray-600">{currentGig.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Clock className="text-gray-600" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-semibold text-gray-800">{currentGig.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <DollarSign className="text-gray-600" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Pay Rate</p>
                                        <p className="font-semibold text-gray-800">{currentGig.payRate}</p>
                                        <p className="text-xs text-gray-500">Total: ₱130 for 2 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Calendar className="text-gray-600" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Accepted On</p>
                                        <p className="font-semibold text-gray-800">
                                            {new Date(currentGig.acceptedAt).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <MapPin className="text-gray-600" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Distance</p>
                                        <p className="font-semibold text-gray-800">Approx. 1.2 km</p>
                                        <p className="text-xs text-gray-500">15-20 minutes travel</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Job Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        // Open in Google Maps
                                        const [lng, lat] = currentGig.location;
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                                    }}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Navigation size={20} />
                                    Get Directions
                                </button>

                                <button
                                    onClick={() => {
                                        // Contact employer
                                        alert("Calling employer at +63 912 345 6789");
                                    }}
                                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <User size={20} />
                                    Contact Employer
                                </button>

                                <button
                                    onClick={completeJob}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={20} />
                                    Mark as Completed
                                </button>

                                <button
                                    onClick={() => {
                                        if (confirm("Cancel this job? This will affect your rating.")) {
                                            localStorage.removeItem('currentGig');
                                            router.push('/gigdaddy');
                                        }
                                    }}
                                    className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
                                >
                                    Cancel Job
                                </button>
                            </div>
                        </div>

                        {/* Earnings Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">Earnings Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Hourly Rate</span>
                                    <span className="font-medium">₱65/hr</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium">2 hours</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-gray-800 font-semibold">Total Earnings</span>
                                    <span className="text-green-600 font-bold">₱130</span>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                Payment will be released within 24 hours after job completion.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden">
                <div className="flex p-4 gap-3">
                    <button
                        onClick={() => {
                            const [lng, lat] = currentGig.location;
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                        }}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                        <Navigation size={20} />
                        Directions
                    </button>
                    <button
                        onClick={completeJob}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={20} />
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
}