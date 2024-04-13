import { Dispatch, SetStateAction, useEffect } from 'react';
import { Form, Slider } from 'antd';

interface RatingProps {
    rating: number[];
    setRating: Dispatch<SetStateAction<number[]>>;
}

const mark = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
};

const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
    const [sliderForm] = Form.useForm();

    useEffect(() => {
        sliderForm.setFieldsValue({ slider: rating });
    }, [rating]);

    return (
        <div className="flex flex-col">
            <h1 className="mt-8 mb-2 text-xl font-bold">Ratings</h1>
            <Form form={sliderForm} initialValues={{ slider: [0, 10] }}>
                <Form.Item name={'slider'}>
                    <Slider
                        range
                        max={10}
                        step={0.01}
                        marks={mark}
                        onChangeComplete={(value) => {
                            setRating(value);
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default Rating;
