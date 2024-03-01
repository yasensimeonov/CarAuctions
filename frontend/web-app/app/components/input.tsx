import type { FieldValues, FieldPath } from "react-hook-form"
import {useController, UseControllerProps} from "react-hook-form";
import {Label, TextInput} from "flowbite-react";

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps<TFieldValues, TName>

export default function Input<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const {fieldState, field} = useController({...props})

    const { showLabel, ...rest } = props;

    return (
        <div className='mb-3'>
            {showLabel && (
                <div className='mb-2 block'>
                    <Label htmlFor={field.name} value={props.label} />
                </div>

            )}
            <TextInput
                {...rest}
                {...field}
                type={props.type || 'text'}
                placeholder={props.label}
                // color={errors?.model && 'failure'}
                color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
                // helperText={errors.model?.message as string}
                helperText={fieldState.error?.message}
            />
        </div>
    )
}