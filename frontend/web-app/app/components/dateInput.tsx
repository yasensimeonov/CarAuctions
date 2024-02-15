import {FieldPath, FieldValues, useController, UseControllerProps} from "react-hook-form";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, {ReactDatePickerProps} from "react-datepicker";

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps<TFieldValues, TName> & Partial<ReactDatePickerProps>

export default function DateInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const {fieldState, field} = useController({...props})

    return (
        <div className='block'>
            <DatePicker
                {...props}
                {...field}
                onChange={value => field.onChange(value)}
                // type={props.type || 'text'}
                selected={field.value}
                placeholderText={props.label}
                // color={errors?.model && 'failure'}
                // color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
                // helperText={errors.model?.message as string}
                // helperText={fieldState.error?.message}
                className={`
                    rounded-lg w-[100%] flex flex-col
                    ${fieldState.error 
                        ? 'bg-red-50 border-red-500 text-red-900' 
                        : (!fieldState.invalid && fieldState.isDirty) 
                        ? 'bg-green-50 border-green-500 text-green-900' : ''}
                `}
            />
            {fieldState.error && (
                <div className='text-red-500 text-sm'>
                    {fieldState.error.message}
                </div>
            )}
        </div>
    )
}