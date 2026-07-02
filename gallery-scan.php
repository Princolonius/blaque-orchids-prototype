<?php
// Scans the gallery category folders and returns the image filenames
// found in each as JSON, so gallery.html can list newly uploaded
// photos automatically without any manual manifest editing.

header('Content-Type: application/json');

$categories = [
    'civil-engineering' => 'Civil Engineering',
    'general-build'     => 'General Build',
    'hard-fm'           => 'Hard FM',
    'soft-fm'           => 'Soft FM',
];

$allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$baseDir = __DIR__ . '/assets/img/gallery/';

$result = [];

foreach ($categories as $slug => $label) {
    $dir = $baseDir . $slug;
    $files = [];

    if (is_dir($dir)) {
        $entries = scandir($dir);
        natsort($entries);
        foreach ($entries as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }
            $ext = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
            if (in_array($ext, $allowedExt, true)) {
                $files[] = $entry;
            }
        }
    }

    $result[$slug] = array_values($files);
}

echo json_encode($result, JSON_PRETTY_PRINT);
