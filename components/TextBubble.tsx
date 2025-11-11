
// will wrap text (not in an element)
export default function TextBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-bubble">
            <p>{children}</p>
        </div>
    );
}