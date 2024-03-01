import { Input } from "@/shadComponents/ui/input"
import { Label } from "@/shadComponents/ui/label"
import type { FieldValues, FieldPath } from "react-hook-form"
import {useController, UseControllerProps} from "react-hook-form";
import {clsx} from "clsx";

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps<TFieldValues, TName>

export default function ShadInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const {fieldState, field} = useController({...props})

    const { showLabel, ...rest } = props;

    return (
        <div className='mb-3'>
            {showLabel && (
                <div className='mb-2 block'>
                    <Label htmlFor={field.name} defaultValue={props.label} >{props.label}</Label>
                </div>
            )}
            <Input
                {...rest}
                {...field}
                type={props.type || 'text'}
                placeholder={props.label}
                // color={errors?.model && 'failure'}
                // color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
                // helperText={errors.model?.message as string}
                // helperText={fieldState.error?.message}
                // className={`
                //     ${fieldState.error
                //     ? 'focus-visible:ring-red-500 focus-visible:border-red-500 bg-red-50 border-red-500 text-red-900'
                //     : (!fieldState.invalid && fieldState.isDirty)
                //         ? 'focus-visible:ring-green-500 focus-visible:border-green-500 bg-green-50 border-green-500 text-green-900'
                //         : ''}
                // `}
                className={clsx(
                    '',
                    {
                        'focus-visible:ring-red-500 focus-visible:border-red-500 bg-red-50 border-red-500 text-red-900': fieldState.error,
                        'focus-visible:ring-green-500 focus-visible:border-green-500 bg-green-50 border-green-500 text-green-900': !fieldState.invalid && fieldState.isDirty
                    }
                )}
            />
            {fieldState.error && (
                <div className='text-red-500 text-sm mt-1'>
                    {fieldState.error.message}
                </div>
            )}
        </div>
    )
}