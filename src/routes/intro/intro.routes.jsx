import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Add animations
import './intro.styles.scss';
import BasicBtn from '../../components/basicBtn/basicBtn.component';

const Intro = () => {
    return (
        <div className="intro">
            <motion.div
                className="intro__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            ></motion.div>
            <div className="intro__container">
                <div className="intro__head">
                    <div className="intro__img">
                        {/* Uncomment and use dynamic logo */}
                        {/* <img src={Logo} alt="Bingebox Logo" /> */}
                    </div>
                    <div className="intro__text">
                        <motion.h2 
                            data-aos="fade-up"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Unlimited Movies, TV Shows, and More
                        </motion.h2>
                        <motion.h3
                            data-aos="fade-up"
                            data-aos-delay="200"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Watch Anywhere!
                        </motion.h3>
                    </div>
                </div>
                <div className="intro__foot">
                    <Link to="/signup" className="intro__btn-link">
                        <BasicBtn text="Start Now!" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Intro;
