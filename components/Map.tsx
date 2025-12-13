
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
} from "lucide-react";

export default function Map() {
    const router = useRouter();

    // ===== Map states =====
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker | null>(null);
    const gigMarkerRef = useRef<maplibregl.Marker | null>(null);
    const routeLineRef = useRef<any>(null);
    const routeSourceRef = useRef<maplibregl.Source | null>(null);
    const [loadingMap, setLoadingMap] = useState(true);

    const [status, setStatus] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [hasFoundGig, setHasFoundGig] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [gigLocation, setGigLocation] = useState<[number, number] | null>(null);

    // ===== Face Verification states =====
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [showFaceModal, setShowFaceModal] = useState(false);
    const [verificationStep, setVerificationStep] = useState<
        "ready" | "capturing" | "confirming" | "success"
    >("ready");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        if (showFaceModal) {
            startCamera();
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
        if (!mapInstance.current) return;

        // Remove existing gig marker if any
        if (gigMarkerRef.current) {
            gigMarkerRef.current.remove();
        }

        // Add new gig marker with different color
        gigMarkerRef.current = new maplibregl.Marker({
            color: "#10b981", // Green color
            draggable: false
        })
            .setLngLat(location)
            .addTo(mapInstance.current);

        // Add popup to gig marker
        const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML(`
                <div class="p-2">
                    <div class="font-bold text-green-700">Available Gig Found!</div>
                    <div class="text-sm text-gray-600 mt-1">Shopee Packing of 50 orders</div>
                    <div class="text-xs text-gray-500">2 hours • ₱65/hr</div>
                    <button class="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full">
                        Accept Gig
                    </button>
                </div>
            `);
        gigMarkerRef.current.setPopup(popup);
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
    const startCamera = async () => {
        setCapturedImage(null);
        setVerificationStep("ready");
        setShowFaceModal(true);

        if (navigator.mediaDevices && videoRef.current) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "user",
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                });
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            } catch (err) {
                console.error("Camera access error:", err);
            }
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        setVerificationStep("capturing");

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        setCapturedImage(dataUrl);
        stopCamera();

        // Show captured image ready for confirmation
        setVerificationStep("ready");
    };

    const retryVerification = () => {
        setCapturedImage(null);
        setVerificationStep("ready");
        setTimeout(() => startCamera(), 100);
    };

    const closeFaceModal = () => {
        stopCamera();
        setShowFaceModal(false);
        setCapturedImage(null);
        setVerificationStep("ready");
    };

    const handleConfirm = () => {
        // Start the 3-second verification process
        setVerificationStep("confirming");

        // Show "...verifying" for 3 seconds
        setTimeout(() => {
            // After 3 seconds, show "Verified Successfully"
            setVerificationStep("success");
            setStatus(true); // Set status to true

            // Close modal after 1.5 seconds and start searching
            setTimeout(() => {
                closeFaceModal();
                // Start searching animation
                setIsSearching(true);

                // After 4 seconds, find a gig and add route
                setTimeout(() => {
                    if (currentLocation) {
                        const gigLoc = findNearbyGigLocation(currentLocation);
                        setGigLocation(gigLoc);
                        addGigMarker(gigLoc);
                        createRoute(currentLocation, gigLoc);
                        setHasFoundGig(true);

                        // Update searching text
                        setIsSearching(false);
                    }
                }, 4000);
            }, 1500);
        }, 3000);
    };

    // Stop searching when clicking the searching button
    const stopSearching = () => {
        setIsSearching(false);
        setStatus(false);
        setHasFoundGig(false);

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
    const gigData = {
        id: Date.now().toString(),
        title: "Pack and label 50 orders",
        description: "Shopee Packing of 50 orders",
        duration: "2 hours",
        payRate: "₱65/hr",
        location: gigLocation,
        acceptedAt: new Date().toISOString(),
        status: "active"
    };
    localStorage.setItem('currentGig', JSON.stringify(gigData));
    
    // Navigate to myCurrentJob page
    router.push('/gigdaddy/myCurrentJob');
};

    // ===== JSX =====
    return (
        <div className="relative w-full h-screen">
            {/* Map container */}
            <div ref={mapContainer} className="w-full h-full" />

            {status ? (
                <span className="absolute top-10 right-20 z-50 text-[1.1rem] border-2 rounded-md py-1 px-2 font-semibold border-green-700 text-green-700">
                    <i className="ri-circle-fill"></i> Available
                </span>
            ) : (
                <span className="absolute top-10 right-20 z-50 text-[1.1rem] border-2 rounded-md py-1 px-2 font-semibold border-gray-600">
                    <i className="ri-circle-line"></i> Unavailable
                </span>
            )}

            {/* Map loader */}
            {loadingMap && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 border-gray-300" />
                </div>
            )}

            {/* Gig found overlay */}
            {hasFoundGig && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-green-100 border border-green-300 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-600" size={24} />
                        <div>
                            <h3 className="font-semibold text-green-800">Gig Found!</h3>
                            <p className="text-green-700 text-sm">Pack and label 50 orders - 2 hours • ₱65/hr</p>
                        </div>
                        <button
                            onClick={acceptGig}
                            className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                        >
                            Accept
                        </button>
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
                                    Searching for gigs...
                                </p>
                            </div>
                        </div>

                        {/* Searching text */}
                        <div className="mt-4 text-center">
                            <p className="text-white/80 text-sm mt-2 bg-black/40 px-3 py-1 rounded-md">
                                Finding opportunities near you
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
                    onClick={() => setShowFaceModal(true)}
                >
                    <Search size={20} />
                    Search for a gig
                </button>
            ) : isSearching ? (
                <button
                    className="absolute bottom-15 right-15 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-500 z-50 flex items-center gap-2"
                    onClick={stopSearching}
                >
                    <Loader2 className="animate-spin" size={20} />
                    Searching for a gig...
                </button>
            ) : (
                <div className="absolute bottom-15 right-15 flex gap-3 z-50">
                    <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 flex items-center gap-2"
                        onClick={acceptGig}
                    >
                        <CheckCircle size={20} />
                        Accept Gig
                    </button>
                    <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-500 flex items-center gap-2"
                        onClick={stopSearching}
                    >
                        <XCircle size={20} />
                        Cancel
                    </button>
                </div>
            )}

            {/* Navigation instructions */}
            {hasFoundGig && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-40 border border-gray-200">
                    <div className="flex items-center gap-3">
                        <Navigation className="text-blue-600" size={24} />
                        <div>
                            <h4 className="font-semibold text-gray-800">Route to Gig</h4>
                            <p className="text-gray-600 text-sm">Follow the amber dashed line to the gig location</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Face verification modal */}
            {showFaceModal && (
                <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    {/* White modal container */}
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">

                        {/* Header with close button */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Face Verification
                            </h2>
                            <button
                                onClick={closeFaceModal}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Content area */}
                        <div className="p-6 flex flex-col items-center">
                            {/* Verification status display */}
                            {verificationStep === "confirming" && (
                                <div className="mb-6 w-full bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-center gap-3">
                                    <Loader2 className="animate-spin text-blue-600" size={24} />
                                    <span className="text-blue-700 font-medium text-lg">...verifying</span>
                                </div>
                            )}

                            {verificationStep === "success" && (
                                <div className="mb-6 w-full bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-center gap-3">
                                    <CheckCircle className="text-green-600" size={24} />
                                    <span className="text-green-700 font-medium text-lg">Verified Successfully</span>
                                </div>
                            )}

                            {/* Camera preview / Captured image */}
                            <div className="relative w-full flex justify-center mb-6">
                                {!capturedImage ? (
                                    <video
                                        ref={videoRef}
                                        className="w-72 h-72 rounded-xl object-cover border-2 border-gray-300"
                                        autoPlay
                                        playsInline
                                        muted
                                    />
                                ) : (
                                    <img
                                        src={capturedImage}
                                        className={`w-72 h-72 rounded-xl object-cover border-2 border-gray-300 ${verificationStep === "confirming" || verificationStep === "success"
                                            ? "opacity-90"
                                            : ""
                                            }`}
                                        alt="Captured face"
                                    />
                                )}
                            </div>

                            {/* Tips section */}
                            <div className="w-full mb-6 bg-gray-50 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Tips for better verification:</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Make sure your face is clearly visible
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Look directly at the camera
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Ensure good lighting
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Remove glasses if possible
                                    </li>
                                </ul>
                            </div>

                            {/* Action buttons */}
                            <div className="w-full flex flex-col gap-3">
                                {!capturedImage ? (
                                    <button
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                        onClick={capturePhoto}
                                    >
                                        <Camera size={20} />
                                        Capture Photo
                                    </button>
                                ) : verificationStep === "ready" ? (
                                    <>
                                        <button
                                            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                            onClick={handleConfirm}
                                        >
                                            <CheckCircle size={20} />
                                            Confirm & Verify
                                        </button>
                                        <button
                                            className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                                            onClick={retryVerification}
                                        >
                                            <RotateCw size={20} />
                                            Retake Photo
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>

                        {/* Capturing indicator */}
                        {verificationStep === "capturing" && (
                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <Loader2 className="animate-spin" size={18} />
                                    <span className="text-sm">Capturing photo...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
        </div>
    );
}