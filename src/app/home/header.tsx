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
            <h1 className="m-auto mt-5 text-[54px] font-extrabold text-center">¡Bienvenido a Project Pulse! <small className="text-gray-500 dark:text-gray-400">
                Sigue el pulso de tu proyecto, siente el progreso.
            </small>
            </h1>
        </>
    )
}