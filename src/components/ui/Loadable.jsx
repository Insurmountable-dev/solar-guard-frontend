import { SkeletonCard } from "./Skeleton";

export default function Loadable({loading, skeleton = <SkeletonCard />,children,}) {

    if (!loading) return children;
    return (
        <div role="status" aria-busy="true" className="h-full">
            <span className="sr-only">Loading…</span>
            {skeleton}
        </div>
    );
}