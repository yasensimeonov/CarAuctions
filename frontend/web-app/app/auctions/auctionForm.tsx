'use client';

import {FieldValues, useForm} from "react-hook-form";
import {Button, TextInput} from "flowbite-react";
import Input from "@/app/components/input";
import {useEffect} from "react";

export default function AuctionForm() {
    const {
        control,
        // register,
        handleSubmit,
        setFocus,
        formState: {isSubmitting, isValid, isDirty, errors}
    } = useForm({
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
            <Input label='Make' name='make' control={control} rules={{required: 'Make is required'}}/>

            {/*<div className='mb-3 block'>*/}
            {/*    <TextInput*/}
            {/*        {...register('model', {required: 'Model is required'})}s*/}
            {/*        placeholder='Model'*/}
            {/*        color={errors?.model && 'failure'}*/}
            {/*        helperText={errors.model?.message as string}*/}
            {/*    />*/}
            {/*</div>*/}
            <Input label='Model' name='model' control={control} rules={{required: 'Model is required'}}/>

            <Input label='Color' name='color' control={control} rules={{required: 'Color is required'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Year' name='year' control={control} type='number'
                    rules={{required: 'Year is required'}}/>
                <Input label='Mileage' name='mileage' control={control} type='number'
                    rules={{required: 'Mileage is required'}}/>
            </div>

            <Input label='Image URL' name='imageUrl' control={control} rules={{required: 'Image URL is required'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Reseve Price (enter 0 if no reserve)' name='reservePrice' control={control} type='number'
                    rules={{required: 'Reserve Price is required'}}/>
                <Input label='Auction end date/time' name='auctionEnd' control={control} type='date'
                    rules={{required: 'Auction End is required'}}/>
            </div>

            <div className='flex justify-between'>
                <Button outline color='gray'>Cancel</Button>
                <Button
                    isProcessing={isSubmitting}
                    // disabled={!isValid}
                    type='submit'
                    outline color='success'>Submit</Button>
            </div>
        </form>
    )
}