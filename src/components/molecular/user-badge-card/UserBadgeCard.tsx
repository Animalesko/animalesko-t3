import { Avatar, Badge, Card, CardBody } from "@nextui-org/react";
import React from "react";

interface UserBadgeCardProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  leskoins: number;
}

export const UserBadgeCard: React.FC<UserBadgeCardProps> = ({
  user,
  leskoins,
}) => {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row items-center gap-4">
          <Badge content={leskoins}>
            <Avatar radius="md" size="md" src={user.image ?? undefined} />
          </Badge>

          <p className="hidden text-lg font-semibold sm:block">{user.name}</p>
        </div>
      </CardBody>
    </Card>
  );
};
