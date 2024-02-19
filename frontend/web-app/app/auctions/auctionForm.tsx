'use client';

import {FieldValues, useForm} from "react-hook-form";
import {Button} from "flowbite-react";
import Input from "@/app/components/input";
import {useEffect} from "react";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {addDays, format} from "date-fns";
import DateInput from "@/app/components/dateInput";
import DateTimeInput from "@/app/components/dateTimeInput";

const schema = yup.object({
    make: yup.string().max(5, 'Max Make length is 5').required('Make is required'),
    model: yup.string().max(10, 'Max Model length is 10').required('Model is required'),
    color: yup.string().max(10, 'Max Color length is 10').required('Color is required'),
    year: yup.number().nullable().transform((value) => Number.isNaN(value) ? null : value)
        .min(1995, 'We accept cars newer than 1994').max(2024, 'Year cannot be greater than 2024').required('Year is required'),
    mileage: yup.number().nullable().transform((value) => Number.isNaN(value) ? null : value)
        .positive('Mileage must be greater than 0').max(999999, 'We do not sell cars with more than 1 million miles').required('Mileage is required'),
    // imageUrl: yup.string().min(10, 'Image URL must be at least 10 characters long').required('Image URL is required'),
    imageUrl: yup.string().url('Provide a valid image URL').required('Image URL is required'),
    reservePrice: yup.number().moreThan(-1, 'Reserve Price cannot be negative').integer().nullable()
        .transform((value) => Number.isNaN(value) ? null : value).required('Reserve Price is required'),
    auctionEnd: yup.date().min(addDays(new Date(), 1), 'Auction End Date cannot be sooner than tomorrow').required('Auction End Date is required'),
    // auctionEnd: yup.string().required('Auction End Date is required')
})

export default function AuctionForm() {
    const {
        control,
        handleSubmit,
        setFocus,
        formState: {isSubmitting, isValid, isDirty, errors}
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            make: '', model: '', color: '', year: 1995, mileage: 10000, imageUrl: '', reservePrice: 0,
            // auctionEnd: format(addDays(new Date(), 1), 'yyyy-MM-dd')
            auctionEnd: addDays(new Date(), 1)
            // auctionEnd: undefined
        },
        mode: 'onTouched'
    });

    useEffect(() => {
        setFocus('make');
    }, [setFocus]);

    function onSubmit(data: FieldValues) {
        console.log('react-hook-form onSubmit', data);
    }
    // const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input
                label='Make' name='make' control={control}
                // rules={{required: 'Make is required'}}
            />

            {/*<div className='mb-3 block'>*/}
            {/*    <TextInput*/}
            {/*        {...register('model', {required: 'Model is required'})}s*/}
            {/*        placeholder='Model'*/}
            {/*        color={errors?.model && 'failure'}*/}
            {/*        helperText={errors.model?.message as string}*/}
            {/*    />*/}
            {/*</div>*/}
            <Input label='Model' name='model' control={control} />

            <Input label='Color' name='color' control={control} />

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Year' showLabel name='year' control={control} type='number' />
                <Input label='Mileage' showLabel name='mileage' control={control} type='number' />
            </div>

            <Input label='Image URL' name='imageUrl' control={control} />

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Reserve Price (enter 0 if no reserve)' showLabel name='reservePrice' control={control} type='number' />
                {/*<Input label='Auction end date/time' name='auctionEnd' control={control} type='date' />*/}
                {/*<DateInput*/}
                {/*    label='Auction end date/time'*/}
                {/*    showLabel*/}
                {/*    name='auctionEnd'*/}
                {/*    control={control}*/}
                {/*    // type='date'*/}
                {/*    dateFormat='dd MMMM yyyy h:mm a'*/}
                {/*    showTimeSelect*/}
                {/*/>*/}
                <DateTimeInput
                    label='Auction end date/time'
                    placeholder='Select a date and time'
                    showLabel
                    name='auctionEnd'
                    control={control}
                    // type='date'
                    // cssClass='e-calendar-yasen'
                    cssClass='e-input-group'
                />
            </div>

            <div className='flex justify-between'>
                <Button outline color='gray'>Cancel</Button>
                <Button
                    isProcessing={isSubmitting}
                    disabled={!isValid}
                    type='submit'
                    outline color='success'>Submit</Button>
            </div>
        </form>
    )
}