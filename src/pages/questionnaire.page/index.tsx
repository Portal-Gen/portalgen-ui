import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import { PlaceType } from '@/shared/enums/biz.enum'
import { Button, Group, Pill, Text } from '@mantine/core'
import { useUpdateUserPlacePreferencesMutation } from '@/api/hooks/user.hook'
import { notifications } from '@mantine/notifications'

const placeTypeOptions = Object.keys(PlaceType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
        label: PlaceType[key],
        value: key.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase()),
    }))

const FavouriteTypeForm = () => {
    const updateUserPlacePreference = useUpdateUserPlacePreferencesMutation({
        onSuccess: () => {
            notifications.show({
                title: 'Preferences Updated',
                message: 'Your preferences have been updated',
                color: 'blue',
            })
        },
        onError: (error) => {
            
        }
    });

    const {control, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            placeTypes: []
        }
    })

    const onUpdateUserPlacePreferences = (data) => {
        const preferences = placeTypeOptions.reduce((acc, option) => {
            acc[PlaceType[option.label]] = data.placeTypes.includes(option.label) ? 1 : 0;
            return acc;
        }, {})
        
        updateUserPlacePreference.mutate({
            userProfileId: 1,
            preferences: preferences
        })
    }

    const selectedPlaceTypes = watch('placeTypes')

    return (
        <form onSubmit={handleSubmit(onUpdateUserPlacePreferences)} style={{textAlign:'center'}}>
            <h1>Select Your Favourite Types (at least 5)</h1>
            <Controller 
                name='placeTypes'
                control={control}
                rules = {{
                    validate: (value) => value.length >= 5 || 'Please select at least 5 types'
                }}
                render={({field}) => (
                    <Group style={{marginBottom:"1rem"}}>
                        {placeTypeOptions.map((option) => (
                            <Pill
                                key={option.label}
                                onClick={() => {
                                    const newValue = field.value.includes(option.label) ? field.value.filter((val) => val !== option.label) : [...field.value, option.label]
                                    field.onChange(newValue)
                                }}
                                style={{cursor: 'pointer',
                                    backgroundColor: field.value.includes(option.label) ? 'darkblue' : 'lightgray',
                                    color: field.value.includes(option.label) ? 'white' : 'var(--mantine-color-dark)',
                                }}
                            >
                                {option.value}
                            </Pill>
                        ))}
                    </Group>
                )}
            />
            {errors.placeTypes &&  <Text c='red'>{errors.placeTypes.message}</Text>}
            <Button type='submit' disabled={selectedPlaceTypes.length < 5}>
                Submit
            </Button>
        </form>
    )
}

export default FavouriteTypeForm


