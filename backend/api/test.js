export default function handler(req, res) {

    if (req.method === "POST") {
        return res.status(200).json({ message: "POST OK" });
    }
    if (req.method === "GET") {
        return res.status(200).json({ message: "GET OK" });
    }
    res.status(405).end();
}
