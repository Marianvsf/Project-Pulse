export const Header = () => {
    return (
        <>
            <video
                width={1920}
                height={400}
                src={"/assets/video.mp4"}
                className="block w-full h-[600px] object-cover rounded-2xl"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
            ></video>
            <h1 className="m-auto mt-5 text-[44px] font-extrabold text-center tracking-tighter">¡Bienvenido a Project Pulse! <br /><small className="text-[34px] text-gray-500 dark:text-gray-400 tracking-tighter">
                Sigue el pulso de tu proyecto, siente el progreso.
            </small>
            </h1>
        </>
    )
}