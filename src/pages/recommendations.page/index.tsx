import React, { useState, useCallback } from "react";
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
import { TResponse } from "@/api/recommendation";

const PlaceRecommendations = () => {
  const [places, setPlaces] = useState<IPlaceRecommendationResponse[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const maxPollAttempts = 10; // Maximum number of polling attempts

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const requestPlaceRecommendationsMutation =
    useRequestPlaceRecommendationsMutation();

  const handlePollSuccess = useCallback(
    (data: TResponse<IPlaceRecommendationResponse[]>) => {
      if (data.successful === true || pollCount >= maxPollAttempts) {
        setPlaces(data.data || []);
        setIsLoading(false);
        setPollCount(0); // Reset poll count
      } else {
        // Continue polling if not complete or successful
        if (pollCount < maxPollAttempts) {
          setTimeout(() => {
            pollPlaceRecommendationsMutation.mutate({
              userProfileId: 1,
              worldCityId: 1704413791,
            });
            setPollCount((prev) => prev + 1);
          }, 3000); // Adjust polling interval as needed
        } else {
          // Handle situation where max attempts are reached but not successful
          setIsLoading(false);
          setError("Failed to confirm place recommendations.");
        }
      }
    },
    [pollCount, maxPollAttempts]
  );
  const pollPlaceRecommendationsMutation = usePollPlaceRecommendationsMutation({
    onSuccess: handlePollSuccess,
    onError: (error) => {
      setIsLoading(false);
      setError("Failed to fetch place recommendations.");
      console.error("Polling error:", error);
    },
  });

  const onSubmit = (formData) => {
    setIsLoading(true);
    setError(null); // Reset previous errors on new submission

    const userProfileId = 1;
    const { city, country } = formData;

    requestPlaceRecommendationsMutation.mutate(
      { userProfileId, worldCityId: 1704413791 }, // Use correct IDs from formData if necessary
      {
        onSuccess: () => {
          pollPlaceRecommendationsMutation.mutate({
            userProfileId,
            worldCityId: 1704413791,
          });
        },
        onError: (error) => {
          setIsLoading(false);
          setError("Failed to request place recommendations.");
          console.error("Request error:", error);
        },
      }
    );
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
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
    </div>
  );
};

export default PlaceRecommendations;
