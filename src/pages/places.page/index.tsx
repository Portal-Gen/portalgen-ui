import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  TextInput,
  Button,
  Card,
  Text,
  SimpleGrid,
  Container,
  Title,
  Space,
} from "@mantine/core";

import {
  useRequestPlaceRecommendationsMutation,
  usePollPlaceRecommendationsMutation,
} from "@/api/hooks/recommendation.hook";
import { IPlaceRecommendationResponse } from "./interface";
import { Link } from "react-router-dom";

const PlaceRecommendations = () => {
  const [places, setPlaces] = useState<IPlaceRecommendationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const requestPlaceRecommendationsMutation =
    useRequestPlaceRecommendationsMutation();

  const pollPlaceRecommendationsMutation = usePollPlaceRecommendationsMutation({
    onSuccess: (data) => {
      setPlaces(data);
      setIsLoading(false);
    },

    onError: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    const userProfileId = 1;
    const { city, country } = data;

    requestPlaceRecommendationsMutation.mutate(
      {
        userId: userProfileId,
        cityName: city,
        country: country,
      },
      {
        onSuccess: () => {
          pollPlaceRecommendationsMutation.mutate({
            userId: userProfileId,
            cityName: city,
            country: country,
          });
        },
      }
    );
  };

  return (
    <Container size="sm" p="md">
      <Title style={{ textAlign: "center" }}>Find Places to Visit</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("city", { required: true })}
          label="Enter a city"
          placeholder="e.g., Melbourne"
          style={{ marginTop: 20 }}
        />
        <TextInput
          {...register("country", { required: true })}
          label="Enter a country"
          placeholder="e.g., Australia"
          style={{ marginTop: 20 }}
        />

        {errors.location && <Text c="red">This field is required</Text>}
        <Button type="submit" loading={isLoading} style={{ marginTop: 20 }}>
          Get Recommendations
        </Button>
      </form>
      <Space h="md" />
      {places?.length > 0 && (
        <SimpleGrid cols={3} spacing="lg" style={{ marginTop: 20 }}>
          {places.map((place) => (
            <Card
              key={place.placeDetails.id}
              shadow="sm"
              padding="lg"
              bg={"lightgray"}
            >
              <Card.Section>
                <Link
                  to={`/place/${place.placeDetails.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Text w={"100%"} size="lg" style={{ cursor: "pointer" }}>
                    {place.placeDetails.displayName}
                  </Text>
                </Link>
              </Card.Section>
              <Text size="sm" style={{ marginTop: 10 }}>
                {place.placeDetails.formattedAddress}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default PlaceRecommendations;
