export default function safeSquareRoot(a) {
    if (a < 0) {
        throw new Error("Math error: negative root undefined");
    }

    return a.sqrt();
}