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
const MainPage = () => {
    usePageTitle('ماشین حساب خدمت'); // Set the title to "Home Page"
    const [modal, setModal] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [modalContent, setModalContent] = useState({ title: '', content: '', subText: '', isError: false })
    const [dividerHighlights, setDividerHighlights] = useState({});
    const options = [
        { label: 'امریه', value: 1 },
        { label: 'وظیفه عادی', value: 2 }
    ];
    const home = [
        { label: 'بومی', value: 1 },
        { label: 'غیر بومی', value: 2 }
    ]

    const fieldType = [
        { label: 'عملیاتی', value: 1 },
        { label: 'غیر عملیاتی', value: 2 }
    ]


    const [initialDate, setInitialDate] = useState(new DateObject())
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedHome, setSelectedHome] = useState('')
    const [selectedField, setSelectedField] = useState('')
    const [kasri, setKasri] = useState(0)
    const [ezafe, setEzafe] = useState(0)


    const handleRadioChange = (value, setter) => {
        setter(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        const newHighlights = { ...dividerHighlights };
        if (selectedOption == "" || selectedHome == "" || selectedField == "") {
            console.log("error")
            if (selectedOption == "") {
                newHighlights['divider2'] = true;
            } if (selectedHome == "") {
                newHighlights['divider3'] = true;
            } if (selectedField == "") {
                newHighlights['divider4'] = true;
            }
            setModalContent({ title: 'خطا', content: 'لطفا تمام مقادیر فرم رو انتخاب کن', isError: true })
            setModal(true)
            setDividerHighlights(newHighlights);
            // Reset highlight after a delay
            setTimeout(() => {
                setDividerHighlights({});
            }, 4000);
            return
        }
        if (kasri >= 650) {
            setModalContent({ title: 'خطا', content: 'مقدار کسری نمیشه بیشتر از ۲۴ ماه باشه', isError: true })
            setModal(true)
            return
        }
        if (selectedOption == 'type0') {
            let message = "چون نوع خدمت شما امریه هست به لحاظ فنی باید۲۴ ماه خدمت کنی و کسری روی امریه ارگان های غیر نظامی معمولا اعمال نمیشه.همچنین به توجه به  " + ezafe + ' روز اضافه خدمت٫تاریخ ترخیص شما  '
            let tmpDate = initialDate
            tmpDate = tmpDate.add(21, 'month')
            tmpDate = tmpDate.add(ezafe, 'day')
            message += tmpDate.weekDay.name + ' '
            message += tmpDate.day + ' '
            message += tmpDate.month.name + ' ماه '
            message += tmpDate.year + ' '
            message += 'خواهد بود.'
            let tmpDateProp = tmpDate.toDate()
            let tmpNow = new Date()
            const diffInTime = tmpDateProp.getTime() - tmpNow.getTime();
            console.log(diffInTime)
            // // Convert the difference from milliseconds to days
            const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
            let subText = 'به عبارت دیگه شما در حدود ' + daysLeft + ' روز از خدمتت باقی مونده٫موفق باشی 🙂 ';
            setModalContent({ title: 'تاریخ ترخیص', content: message, subText: subText, isError: false })
            setModal(true)
            return
        } else {
            if (selectedHome == "bomi1" && selectedField == 'field0') {
                let message = 'به دلیل خدمت در منطقه عملیاتی میزان خدمت شما به صورت پیش فرض ۱۴ ماه خواهد بود که به دلیل غیر بومی بودن ۳ ماه هم کسر میشه٫همچنین شما به میزان  ' + kasri + ' روز کسری دارید  ' + 'همچنین با توجه به ' + ezafe + ' روز اضافه خدمت٫تاریخ ترخیص شما '
                let tmpDate = initialDate
                tmpDate = tmpDate.add(14, 'month')
                tmpDate = tmpDate.add(ezafe, 'day')
                tmpDate = tmpDate.subtract(3, 'month')
                tmpDate = tmpDate.subtract(kasri, 'day')
                message += tmpDate.weekDay.name + ' '
                message += tmpDate.day + ' '
                message += tmpDate.month.name + ' ماه '
                message += tmpDate.year + ' '
                message += 'خواهد بود.'
                let tmpDateProp = tmpDate.toDate()
                let tmpNow = new Date()
                const diffInTime = tmpDateProp.getTime() - tmpNow.getTime();
                console.log(diffInTime)
                // // Convert the difference from milliseconds to days
                const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
                let subText = 'به عبارت دیگه شما در حدود ' + daysLeft + ' روز از خدمتت باقی مونده٫موفق باشی 🙂 ';
                setModalContent({ title: 'تاریخ ترخیص', content: message, subText: subText, isError: false })
                setModal(true)
                return
            } else if (selectedHome == 'bomi0' && selectedField == 'field1') {
                let message = 'میزان خدمت شما به دلیل بومی بودن و خدمت در منطقه غیر عملیاتی به طور پیشفرض ۲۱ ماه خواهد بود٫همچنین شما به میزان ' + kasri + ' روز کسری دارید همچنین با توجه به  ' + ezafe + ' روز اضافه خدمت٫تاریخ ترخیص شما '
                let tmpDate = initialDate
                tmpDate = tmpDate.add(21, 'month')
                tmpDate = tmpDate.add(ezafe, 'day')
                tmpDate = tmpDate.subtract(kasri, 'day')
                message += tmpDate.weekDay.name + ' '
                message += tmpDate.day + ' '
                message += tmpDate.month.name + ' ماه '
                message += tmpDate.year + ' '
                message += 'خواهد بود.'
                let tmpDateProp = tmpDate.toDate()
                let tmpNow = new Date()
                const diffInTime = tmpDateProp.getTime() - tmpNow.getTime();
                console.log(diffInTime)
                // // Convert the difference from milliseconds to days
                const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
                let subText = 'به عبارت دیگه شما در حدود ' + daysLeft + ' روز از خدمتت باقی مونده٫موفق باشی 🙂 ';
                setModalContent({ title: 'تاریخ ترخیص', content: message, subText: subText, isError: false })
                setModal(true)
                return
            } else if (selectedHome == 'bomi1' && selectedField == 'field1') {
                let message = 'خدمت شما به دلیل غیر بومی بودن به صورت پیشفرض ۱۸ ماه خواهد بود٫همچنین شما به میزان ' + kasri + ' روز کسری داریدهمچنین با توجه به ' + ezafe + ' روز اضافه خدمت٫تاریخ ترخیص شما '
                let tmpDate = initialDate
                tmpDate = tmpDate.add(18, 'month')
                tmpDate = tmpDate.add(ezafe, 'day')
                tmpDate = tmpDate.subtract(kasri, 'day')
                message += tmpDate.weekDay.name + ' '
                message += tmpDate.day + ' '
                message += tmpDate.month.name + ' ماه '
                message += tmpDate.year + ' '
                message += 'خواهد بود.'
                let tmpDateProp = tmpDate.toDate()
                let tmpNow = new Date()
                const diffInTime = tmpDateProp.getTime() - tmpNow.getTime();
                // // Convert the difference from milliseconds to days
                const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
                let subText = 'به عبارت دیگه شما در حدود ' + daysLeft + ' روز از خدمتت باقی مونده٫موفق باشی 🙂 ';
                setModalContent({ title: 'تاریخ ترخیص', content: message, subText: subText, isError: false })
                setModal(true)
                return
            } else {
                let message = 'خدمت شما به دلیل خدمت در منطقه عملیاتی به صورت پیشفرض ۱۴ ماه خواهد بود همچنین شما به میزان ' + kasri + ' روز کسری دارید همچنین با توجه به ' + ezafe + ' روز اضافه خدمت٫تاریخ ترخیص شما '
                let tmpDate = initialDate
                tmpDate = tmpDate.add(14, 'month')
                tmpDate = tmpDate.subtract(kasri, 'day')
                tmpDate = tmpDate.add(ezafe, 'day')
                message += tmpDate.weekDay.name + ' '
                message += tmpDate.day + ' '
                message += tmpDate.month.name + ' ماه '
                message += tmpDate.year + ' '
                message += 'خواهد بود.'
                let tmpDateProp = tmpDate.toDate()
                let tmpNow = new Date()
                const diffInTime = tmpDateProp.getTime() - tmpNow.getTime();
                // // Convert the difference from milliseconds to days
                const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
                let subText = 'به عبارت دیگه شما در حدود ' + daysLeft + ' روز از خدمتت باقی مونده٫موفق باشی 🙂 ';
                setModalContent({ title: 'تاریخ ترخیص', content: message, subText: subText, isError: false })
                setModal(true)
                return
            }
        }
        console.log('Hi')

    }
    useEffect(() => {
        console.log('initialDate', initialDate)
    }, [initialDate])
    return (
        <div className='w-full h-screen  pr-10 pl-10 relative'>
            <div className='h-full w-full flex flex-col justify-around items-center gap-2 md:gap-0'>
                <Modal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title={modalContent.title}
                    children={modalContent.content}
                    subText={modalContent.subText}
                />
                <div className='h-auto w-full md:w-[40%]  border-4 border-[#4cb5ae] rounded-3xl p-5 flex flex-col relative'>
                    <h1 className='place-self-center'>سلام رفیق</h1>
                    <p className='text-center'>این مینی پروژه برای این طراحی شده که بتونی تاریخ دقیق ترخیص و زمان باقی مونده از خدمتت رو محاسبه کنی٫فقط سعی کن هنگام استفاده ازش کما نزنی</p>
                    <p className='text-center'>:))</p>
                    <hr></hr>
                    <div className='transition-all w-10 h-10 border border-1 border-[#4cb5ae] bg-[#4cb5ae] rounded-r-lg absolute right-[-2.7rem] hidden md:flex items-center justify-center'
                        style={{
                            width: isHovered ? "14rem" : "2.5rem", // Expands to 52px width or 10rem
                            right: "-2.7rem", // Moves right for expansion
                            transform: isHovered ? "translateX(11.5rem)" : "translateX(0)", // Moves content visually to the right

                        }}

                        onMouseEnter={() => { setIsHovered(true) }}
                        onMouseLeave={() => { setIsHovered(false) }}
                    >
                        <FontAwesomeIcon
                            icon={faCopyright}
                            className={`text-[1.5rem] text-white transition-opacity duration-300 absolute ${isHovered ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <a
                        target='_blank'
                            href='https://github.com/farhadmirr/ConscriptionCalculator'
                            className={`ml-2 absolute text-white transition-opacity duration-300 delay-150 text-xs ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                            style={{
                                fontWeight:'700',
                                visibility: isHovered ? "visible" : "hidden",
                            }}
                        >
                            You can support me by giving me star on Github ;)
                        </a>
                    </div>
                    <div className='elementContainer items-center'>
                        <p className='text-center mb-2'>اول بگو ببینیم تاریخ اعزامت به آموزشی کی بوده؟</p>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            value={initialDate}
                            onChange={(value) => { setInitialDate(value) }}
                            
                        />

                    </div>
                    <Divider id="divider1" isHighlighted={dividerHighlights['divider1']} />
                    <div className='elementContainer'>
                        <p className='text-center'>حالا نوع خدمتت رو انتخاب کن</p>
                        <RadioButton
                            options={options}
                            selectedValue={selectedOption}
                            onChange={(e) => { handleRadioChange(e.target.id, setSelectedOption) }}
                            buttonName="type"
                        />
                    </div>
                    <Divider id="divider2" isHighlighted={dividerHighlights['divider2']} />
                    <div className='elementContainer'>
                        <p className='text-center'>بومی هستی یا غیر بومی؟</p>
                        <RadioButton
                            buttonName={"bomi"}
                            options={home}
                            selectedValue={selectedHome}
                            onChange={(e) => { handleRadioChange(e.target.id, setSelectedHome) }}
                        />
                    </div>
                    <Divider id="divider3" isHighlighted={dividerHighlights['divider3']} />
                    <div className='elementContainer'>
                        <p className='text-center'>منطقه مرزی (عملیاتی) خدمت میکنی یا منطقه عادی؟</p>
                        <RadioButton
                            buttonName={"field"}
                            options={fieldType}
                            selectedValue={selectedField}
                            onChange={(e) => { handleRadioChange(e.target.id, setSelectedField) }}
                        />
                    </div>
                    <Divider id="divider4" isHighlighted={dividerHighlights['divider4']} />
                    <div className='flex justify-between'>
                        <div className='elementContainer items-center'>
                            <p className='text-center' style={{ fontSize: '17px' }}>میزان کسری هات رو بر حسب روز بگو</p>
                            <input type='number' pattern='^[0-9]*$' min={0} value={kasri} onChange={(e) => { setKasri(e.target.value) }} className='border-[#4cb5ae] focus:outline-none border-b-2 p-2 text-xl text-center w-1/2' />
                        </div>
                        <div className='elementContainer items-center'>
                            <p className='text-center' style={{ fontSize: '17px' }}>میزان اضافه خدمتت رو بر حسب روز بگو</p>
                            <input type='number' pattern='^[0-9]*$' min={0} value={ezafe} onChange={(e) => { setEzafe(e.target.value) }} className='border-[#4cb5ae] focus:outline-none border-b-2 p-2 text-xl text-center w-1/2' />
                        </div>
                    </div>

                </div>
                <button className='bg-[#F1651D] border border-1 border-[#F1651D] text-white text-xl w-full md:w-[20%] px-6 py-1 rounded-lg hover:bg-white hover:text-[#F1651D] transition-all  ' onClick={handleSubmit}>محاسبه</button>
                <Footer />
            </div>

        </div>
    )
}

export default MainPage