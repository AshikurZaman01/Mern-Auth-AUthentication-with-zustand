import FloatingShapes from '../FloatingShapes/FloatingShapes';

const Home = () => {
    return (
        <div>
            <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900 flex items-center  justify-center  relative overflow-hidden'>

                <FloatingShapes color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}
                />
                <FloatingShapes color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}
                />
                <FloatingShapes color="bg-lime-500" size="w-32 h-32" top="20%" left="70%" delay={2}
                />

            </div>
        </div>
    );
}
export default Home;
