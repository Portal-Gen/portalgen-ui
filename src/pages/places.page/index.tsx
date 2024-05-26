import React, { useState } from "react";
import { IPlaceData } from "../recommendations.page/interface";
import { useGetPlacesByWorldCityIdQuery } from "@/api/hooks/place.hook";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const PlacesPage = () => {
  const { data: places, isLoading } =
    useGetPlacesByWorldCityIdQuery(1704933464);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {places?.length > 0 && (
        <SimpleGrid cols={3} spacing="lg" style={{ marginTop: 20 }}>
          {places.map((place) => (
            <Card key={place.id} shadow="sm" padding="lg" bg={"lightgray"}>
              <Card.Section>
                <Link
                  to={`/place/${place.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Text w={"100%"} size="lg" style={{ cursor: "pointer" }}>
                    {place.displayName}
                  </Text>
                </Link>
              </Card.Section>
              <Text size="sm" style={{ marginTop: 10 }}>
                {place.formattedAddress}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default PlacesPage;
