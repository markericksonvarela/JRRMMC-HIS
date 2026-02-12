import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = true,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
<Avatar className="size-8">
  <AvatarImage
    src="https://github.com/shadcn.png"
    alt="avatar"
  />
  <AvatarFallback>ME</AvatarFallback>
  <AvatarBadge className="bg-green-600" />
</Avatar>


            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    {user.name}
                </span>

                {/* {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )} */}
            </div>
        </>
    );
}
