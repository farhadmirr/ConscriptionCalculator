import React from 'react'

const RadioButton = ({ buttonName, options, selectedValue, onChange }) => {
    return (
        <div className="flex justify-between">
            {options.map((option,index) => (
                <div>
                    <input type="radio" name={buttonName} class="check" id={buttonName+index} onChange={(e)=>{onChange(e)}} />
                    <label for={buttonName+index}>
                        <div class="container">
                            <div class="cRadioBtn">
                                <div class="overlay"></div>
                                <div class="drops xsDrop"></div>
                                <div class="drops mdDrop"></div>
                                <div class="drops lgDrop"></div>
                            </div>
                        </div>
                        <p className='w-[5rem]'>{option.label}</p>
                    </label>
                </div>

            ))}
        </div>
    );
};

export default RadioButton
