import React from "react";
import { Box, Card, Text, Title, Divider, Group } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetPlaceByIdQuery } from "@/api/hooks/place.hook";

const PlaceDetails = () => {
  const { id } = useParams(); // Access the ID passed in the URL
  // Fetch the place details using the ID
  const { data: place, isLoading } = useGetPlaceByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <h1>Place Details</h1>
      <Card shadow="sm" padding="lg" style={{ maxWidth: 800, margin: "auto" }}>
        <Title order={2}>{place.displayName}</Title>
        <Text size="sm" c="dimmed">
          {place.formattedAddress}
        </Text>
        <Divider my="sm" />
        <Group style={{ width: "100%", marginBottom: 10 }}>
          <Text>City: {place.cityName}</Text>
          <Text>
            Rating: {place.rating} ({place.userRatingsTotal} reviews)
          </Text>
        </Group>
        <Group style={{ width: "100%" }}>
          <Text>Price Level: {place.priceLevel}</Text>
          <Text>
            Website:{" "}
            <a
              href={place.websiteUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {place.websiteUri}
            </a>
          </Text>
        </Group>
        <Divider my="sm" />
        <Text>Latitude: {place.latitude}</Text>
        <Text>Longitude: {place.longitude}</Text>
        <Text>Created: {new Date(place.createdAt).toLocaleDateString()}</Text>
        <Text>Updated: {new Date(place.updatedAt).toLocaleDateString()}</Text>
      </Card>
    </Box>
  );
};

export default PlaceDetails;
