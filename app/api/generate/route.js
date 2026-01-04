import clientPromise from "@/lib/mongodb"


export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("URL_SHORTNER")
    const collection = db.collection("url");

    if (!body.url || !body.shorturl) {
        return Response.json({ success: false, error: true, message: 'URL and Short URL are required' })
    }

    // Basic URL validation
    const isValidUrl = (s) => {
        try {
            const u = s.startsWith("http://") || s.startsWith("https://") ? s : `https://${s}`;
            new URL(u);
            return true;
        } catch {
            return false;
        }
    };

    if (!isValidUrl(body.url)) {
        return Response.json({ success: false, error: true, message: 'Invalid URL format' })
    }

    const doc = await collection.findOne({ shorturl: body.shorturl })
    if (doc) {
        return Response.json({ success: false, error: true, message: 'Short URL Already Exists' })
    }

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })



    return Response.json({ success: true, error: false, message: 'URL Generated Successfully' })
}