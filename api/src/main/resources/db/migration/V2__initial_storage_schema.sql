CREATE SCHEMA IF NOT EXISTS storage;

INSERT INTO storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
VALUES
(
    'usuarios_image',
    'usuarios_image',
    true,
    512000,
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp'
    ]
),
(
    'grupos_image',
    'grupos_image',
    true,
    512000,
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp'
    ]
)
ON CONFLICT (id)
DO NOTHING;