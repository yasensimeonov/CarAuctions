import {FieldPath, FieldValues, useController, UseControllerProps} from "react-hook-form";
import {Label} from "flowbite-react";
import { DateTimePickerComponent, DateTimePickerModel } from '@syncfusion/ej2-react-calendars';

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps<TFieldValues, TName> & Partial<DateTimePickerModel>

export default function DateTimeInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const {fieldState, field} = useController({...props})

    const { showLabel, ...rest } = props;

    return (
        <div className='block'>
            {props.showLabel && (
                <div className='mb-2 block'>
                    <Label htmlFor={field.name} value={props.label} />
                </div>
            )}
            <DateTimePickerComponent
                id='datetimepicker'
                {...rest}
                {...field}
                onChange={(value: Date) => field.onChange(value)}
                // onFocus={() => console.log('SyncFusionDateTimePicker', 'focused')}
                value={field.value}
                placeholder={props.label}
                // color={errors?.model && 'failure'}
                // color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
                // helperText={errors.model?.message as string}
                // helperText={fieldState.error?.message}
                // className={`
                //     ${fieldState.error
                //     ? 'e-error'
                //     : (!fieldState.invalid && fieldState.isDirty)
                //         ? 'e-success' : ''}
                // `}
                // cssClass='border-color:#0057ff'
            />
            {fieldState.error && (
                <div className='text-red-500 text-sm'>
                    {fieldState.error.message}
                </div>
            )}
        </div>
    )
}