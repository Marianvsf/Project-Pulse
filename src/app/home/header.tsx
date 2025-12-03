export const Header = () => {
    return (
        <>
            <video
                width={1920}
                height={400}
                src={"/assets/video.mp4"}
                className="block w-full h-[600px] object-cover rounded-2xl mb-10"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
            ></video>
        </>
    )
}