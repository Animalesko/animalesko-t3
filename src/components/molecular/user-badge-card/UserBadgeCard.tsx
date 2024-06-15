import { Avatar, Badge, Card, CardBody } from "@nextui-org/react";
import React from "react";

interface UserBadgeCardProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export const UserBadgeCard: React.FC<UserBadgeCardProps> = ({ user }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row items-center gap-4">
          <Badge>
            <Avatar radius="md" size="md" src={user.image ?? undefined} />
          </Badge>

          <p className="text-lg font-semibold">{user.name}</p>
        </div>
      </CardBody>
    </Card>
  );
};