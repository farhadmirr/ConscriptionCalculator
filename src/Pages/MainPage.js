import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import usePageTitle from '../Hooks/usePageTitle'
import Modal from '../Components/Modal'
import RadioButton from '../Components/RadioButton'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Divider from '../Components/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { Progress } from 'antd';

// Constants
const SERVICE_TYPES = [
    { label: 'امریه', value: 1 },
    { label: 'وظیفه عادی', value: 2 }
];

const RESIDENCY_TYPES = [
    { label: 'بومی', value: 1 },
    { label: 'غیر بومی', value: 2 }
];

const FIELD_TYPES = [
    { label: 'عملیاتی', value: 1 },
    { label: 'غیر عملیاتی', value: 2 }
];

const MAX_KASRI_DAYS = 650;

// Utility functions
const calculateDaysLeft = (releaseDate) => {
    const now = new Date();
    const diffInTime = releaseDate.getTime() - now.getTime();
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
};

const calculatePassedDays = (initialDate) => {
    const now = new Date();
    const diffInTime = now.getTime() - initialDate.getTime();
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
};

const calculateTotalDays = (initialDate, releaseDate) => {
    const diffInTime = releaseDate.getTime() - initialDate.getTime();
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
};

const formatDateMessage = (date) => {
    return `${date.weekDay.name} ${date.day} ${date.month.name} ماه ${date.year}`;
};

const calculateReleaseDate = (initialDate, months, days = 0) => {
    let date = new DateObject(initialDate);
    if (months > 0) date = date.add(months, 'month');
    if (days > 0) date = date.add(days, 'day');
    if (days < 0) date = date.subtract(Math.abs(days), 'day');
    return date;
};

const MainPage = () => {
    usePageTitle('ماشین حساب خدمت');
    
    // State management
    const [modal, setModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [modalContent, setModalContent] = useState({ 
        title: '', 
        content: '', 
        subText: '', 
        isError: false 
    });
    const [dividerHighlights, setDividerHighlights] = useState({});
    const [initialDate, setInitialDate] = useState(new DateObject());
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedHome, setSelectedHome] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [kasri, setKasri] = useState(0);
    const [ezafe, setEzafe] = useState(0);

    const handleRadioChange = (value, setter) => {
        setter(value);
    };

    const showErrorModal = (message) => {
        setModalContent({ 
            title: 'خطا', 
            content: message, 
            isError: true 
        });
        setModal(true);
    };

    const showResultModal = (message, releaseDate) => {
        const daysLeft = calculateDaysLeft(releaseDate.toDate());
        const passedDays = calculatePassedDays(initialDate.toDate());
        const totalDays = calculateTotalDays(initialDate.toDate(), releaseDate.toDate());
        const progressPercent = ((passedDays / totalDays) * 100).toFixed(2);
        
        const subText = (
            <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                    به عبارت دیگه شما در حدود {daysLeft} روز از خدمتت باقی مونده و {passedDays} روز از خدمتت گذشته٫موفق باشی 🙂
                </div>
                <div className="">
                    <Progress
                        type="circle"
                        percent={parseFloat(progressPercent)}
                        format={(percent) => `${percent.toFixed(2)}%`}
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                    />
                </div>
            </div>
        );
        
        setModalContent({ 
            title: 'تاریخ ترخیص', 
            content: message, 
            subText, 
            isError: false 
        });
        setModal(true);
    };

    const validateForm = () => {
        const newHighlights = {};
        let hasError = false;

        if (!selectedOption) {
            newHighlights['divider2'] = true;
            hasError = true;
        }
        if (!selectedHome) {
            newHighlights['divider3'] = true;
            hasError = true;
        }
        if (!selectedField) {
            newHighlights['divider4'] = true;
            hasError = true;
        }

        if (hasError) {
            setDividerHighlights(newHighlights);
            setTimeout(() => setDividerHighlights({}), 4000);
            showErrorModal('لطفا تمام مقادیر فرم رو انتخاب کن');
            return false;
        }

        if (kasri >= MAX_KASRI_DAYS) {
            showErrorModal('مقدار کسری نمیشه بیشتر از ۲۴ ماه باشه');
            return false;
        }

        return true;
    };

    const calculateServiceDuration = () => {
        if (!validateForm()) return;

        let releaseDate;
        let message;

        if (selectedOption === 'type0') {
            // امریه case
            releaseDate = calculateReleaseDate(initialDate, 21, ezafe);
            message = `چون نوع خدمت شما امریه هست به لحاظ فنی باید۲۴ ماه خدمت کنی و کسری روی امریه ارگان های غیر نظامی معمولا اعمال نمیشه.همچنین به توجه به ${ezafe} روز اضافه خدمت٫تاریخ ترخیص شما ${formatDateMessage(releaseDate)} خواهد بود.`;
        } else {
            if (selectedHome === "bomi1" && selectedField === 'field0') {
                // Non-bomi operational case
                releaseDate = calculateReleaseDate(initialDate, 11, ezafe - kasri);
                message = `به دلیل خدمت در منطقه عملیاتی میزان خدمت شما به صورت پیش فرض ۱۴ ماه خواهد بود که به دلیل غیر بومی بودن ۳ ماه هم کسر میشه٫همچنین شما به میزان ${kasri} روز کسری دارید همچنین با توجه به ${ezafe} روز اضافه خدمت٫تاریخ ترخیص شما ${formatDateMessage(releaseDate)} خواهد بود.`;
            } else if (selectedHome === 'bomi0' && selectedField === 'field1') {
                // Bomi non-operational case
                releaseDate = calculateReleaseDate(initialDate, 21, ezafe - kasri);
                message = `میزان خدمت شما به دلیل بومی بودن و خدمت در منطقه غیر عملیاتی به طور پیشفرض ۲۱ ماه خواهد بود٫همچنین شما به میزان ${kasri} روز کسری دارید همچنین با توجه به ${ezafe} روز اضافه خدمت٫تاریخ ترخیص شما ${formatDateMessage(releaseDate)} خواهد بود.`;
            } else if (selectedHome === 'bomi1' && selectedField === 'field1') {
                // Non-bomi non-operational case
                releaseDate = calculateReleaseDate(initialDate, 18, ezafe - kasri);
                message = `خدمت شما به دلیل غیر بومی بودن به صورت پیشفرض ۱۸ ماه خواهد بود٫همچنین شما به میزان ${kasri} روز کسری دارید همچنین با توجه به ${ezafe} روز اضافه خدمت٫تاریخ ترخیص شما ${formatDateMessage(releaseDate)} خواهد بود.`;
            } else {
                // Operational case
                releaseDate = calculateReleaseDate(initialDate, 14, ezafe - kasri);
                message = `خدمت شما به دلیل خدمت در منطقه عملیاتی به صورت پیشفرض ۱۴ ماه خواهد بود همچنین شما به میزان ${kasri} روز کسری دارید همچنین با توجه به ${ezafe} روز اضافه خدمت٫تاریخ ترخیص شما ${formatDateMessage(releaseDate)} خواهد بود.`;
            }
        }

        showResultModal(message, releaseDate);
    };

    return (
        <div className='w-full h-screen py-10 md:py-0 pr-10 pl-10 relative'>
            <div className='h-full w-full flex flex-col justify-around items-center gap-2 md:gap-0'>
                <Modal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title={modalContent.title}
                    children={modalContent.content}
                    subText={modalContent.subText}
                />
                <div className='h-auto w-full md:w-[40%] border-4 border-[#4cb5ae] rounded-3xl p-5 flex flex-col relative'>
                    <h1 className='place-self-center'>سلام رفیق</h1>
                    <p className='text-center'>این مینی پروژه برای این طراحی شده که بتونی تاریخ دقیق ترخیص و زمان باقی مونده از خدمتت رو محاسبه کنی٫فقط سعی کن هنگام استفاده ازش کما نزنی</p>
                    <p className='text-center'>:))</p>
                    <hr />
                    
                    {/* GitHub Link */}
                    <div 
                        className='transition-all w-10 h-10 border border-1 border-[#4cb5ae] bg-[#4cb5ae] rounded-r-lg absolute right-[-2.7rem] hidden md:flex items-center justify-center'
                        style={{
                            width: isHovered ? "14rem" : "2.5rem",
                            right: "-2.7rem",
                            transform: isHovered ? "translateX(11.5rem)" : "translateX(0)",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <FontAwesomeIcon
                            icon={faCopyright}
                            className={`text-[1.5rem] text-white transition-opacity duration-300 absolute ${isHovered ? "opacity-0" : "opacity-100"}`}
                        />
                        <a
                            target='_blank'
                            href='https://github.com/farhadmirr/ConscriptionCalculator'
                            className={`ml-2 absolute text-white transition-opacity duration-300 delay-150 text-xs ${isHovered ? "opacity-100" : "opacity-0"}`}
                            style={{
                                fontWeight: '700',
                                visibility: isHovered ? "visible" : "hidden",
                            }}
                        >
                            You can support me by giving me star on Github ;)
                        </a>
                    </div>

                    {/* Form Fields */}
                    <div className='elementContainer items-center'>
                        <p className='text-center mb-2'>اول بگو ببینیم تاریخ اعزامت به آموزشی کی بوده؟</p>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            value={initialDate}
                            onChange={setInitialDate}
                        />
                    </div>

                    <Divider id="divider1" isHighlighted={dividerHighlights['divider1']} />
                    
                    <div className='elementContainer'>
                        <p className='text-center'>حالا نوع خدمتت رو انتخاب کن</p>
                        <RadioButton
                            options={SERVICE_TYPES}
                            selectedValue={selectedOption}
                            onChange={(e) => handleRadioChange(e.target.id, setSelectedOption)}
                            buttonName="type"
                        />
                    </div>

                    <Divider id="divider2" isHighlighted={dividerHighlights['divider2']} />
                    
                    <div className='elementContainer'>
                        <p className='text-center'>بومی هستی یا غیر بومی؟</p>
                        <RadioButton
                            buttonName="bomi"
                            options={RESIDENCY_TYPES}
                            selectedValue={selectedHome}
                            onChange={(e) => handleRadioChange(e.target.id, setSelectedHome)}
                        />
                    </div>

                    <Divider id="divider3" isHighlighted={dividerHighlights['divider3']} />
                    
                    <div className='elementContainer'>
                        <p className='text-center'>منطقه مرزی (عملیاتی) خدمت میکنی یا منطقه عادی؟</p>
                        <RadioButton
                            buttonName="field"
                            options={FIELD_TYPES}
                            selectedValue={selectedField}
                            onChange={(e) => handleRadioChange(e.target.id, setSelectedField)}
                        />
                    </div>

                    <Divider id="divider4" isHighlighted={dividerHighlights['divider4']} />
                    
                    <div className='flex justify-between'>
                        <div className='elementContainer items-center'>
                            <p className='text-center' style={{ fontSize: '17px' }}>میزان کسری هات رو بر حسب روز بگو</p>
                            <input 
                                type='number' 
                                pattern='^[0-9]*$' 
                                min={0} 
                                value={kasri} 
                                onChange={(e) => setKasri(e.target.value)} 
                                className='border-[#4cb5ae] focus:outline-none border-b-2 p-2 text-xl text-center w-1/2' 
                            />
                        </div>
                        <div className='elementContainer items-center'>
                            <p className='text-center' style={{ fontSize: '17px' }}>میزان اضافه خدمتت رو بر حسب روز بگو</p>
                            <input 
                                type='number' 
                                pattern='^[0-9]*$' 
                                min={0} 
                                value={ezafe} 
                                onChange={(e) => setEzafe(e.target.value)} 
                                className='border-[#4cb5ae] focus:outline-none border-b-2 p-2 text-xl text-center w-1/2' 
                            />
                        </div>
                    </div>
                </div>

                <button 
                    className='bg-[#F1651D] border border-1 border-[#F1651D] text-white text-xl w-full md:w-[20%] px-6 py-1 rounded-lg hover:bg-white hover:text-[#F1651D] transition-all' 
                    onClick={calculateServiceDuration}
                >
                    محاسبه
                </button>
                
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;
