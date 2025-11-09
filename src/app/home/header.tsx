export const Header = () => {
    return (
        <>
            <video
                width={1920}
                height={400}
                src={"/assets/video.mp4"}
                className="block w-full h-[600px] object-cover"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
            ></video>
        </>
    )
}