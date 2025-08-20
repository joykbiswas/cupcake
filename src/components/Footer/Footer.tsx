
import Logo from "../../assets/cake.webp"
import { motion } from 'framer-motion'
import { GRADIENTS } from "../../constants/colors"

const Footer = () => {
    return (
        <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='bg-primary rounded-t-3xl'
        style={{ background: GRADIENTS.PAGE_BACKGROUND }}
        >
            <div className='max-w-screen-2xl mx-auto p-12 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-3
                gap-12'>
                    {/* Brand info  */}
                    <div className='space-y-3 lg:max-w-[300px]'>
                        <img src={Logo} alt="" className='w-24'/>
                        <p>Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Velit, ipsam esse. 
                            Quis quaerat soluta facere nulla odit 
                            enim officiis! Sed.</p>
                            <a href="#" className='inline-block mt-6 text-sm'>joykumarbiswas100@gmail.com</a>
                    </div>
                    {/* Quick Links  */}
                    <div className='col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
                        <div>
                            <h1 className='text-xl font-semibold'>Quick Links</h1>
                            <ul className='space-y-3 mt-6'>
                                <li className='footer-link'>Home</li>
                                <li className='footer-link'>Menu</li>
                                <li className='footer-link'>About</li>
                                <li className='footer-link'>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-xl font-semibold'>Quick Links</h1>
                            <ul className='space-y-3 mt-6'>
                                <li className='footer-link'>Home</li>
                                <li className='footer-link'>Menu</li>
                                <li className='footer-link'>About</li>
                                <li className='footer-link'>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-xl font-semibold'>Quick Links</h1>
                            <ul className='space-y-3 mt-6'>
                                <li className='footer-link'>Home</li>
                                <li className='footer-link'>Menu</li>
                                <li className='footer-link'>About</li>
                                <li className='footer-link'>Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
        )
}

export default Footer