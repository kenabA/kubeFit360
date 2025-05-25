import { Button } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Status from "@/system/components/status/Status";
import treadmill from "@/assets/website/images/hero-bg.jpg";
import { cn, formatTime } from "@/lib/utils";

import { Role } from "@/system/components/role/Role";
import { Icon } from "@iconify/react/dist/iconify.js";
import { UserDetailBlock } from "@/components/user-detail-block/UserDetailBlock";
import useGetUser from "../useGetUser";
import { Badge } from "@/components/ui/badge";

export default function ViewUser({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
  setOpenEdit,
  edit = true,
  role = "member",
}: {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  role?: "member" | "trainer" | "admin" | "maintainer";
}) {
  const { data: user } = useGetUser({
    selectedId: selectedId,
    enabled: isDialogOpen,
  });

  console.log(user);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="!rounded-2xl p-0 flex max-w-5xl overflow-hidden border-none max-h-[450px]"
      >
        {user && (
          <div className="flex items-start w-full">
            <figure className="size-full  overflow-hidden relative">
              <img
                src={user.userImage || treadmill}
                className="size-full object-cover object-center"
                alt="Image of the user"
              />
            </figure>
            <article className="flex flex-col gap-8 p-6 size-full">
              <DialogHeader className="flex flex-col space-y-0 gap-2">
                <DialogTitle className="font-bold text-gray text-[24px]">
                  {user.name}
                </DialogTitle>
                <div className="flex gap-2">
                  <Role role={user?.role} />
                  {user.role === "member" ? (
                    <>
                      <Badge
                        className="h-full border border-slate-300"
                        variant={
                          (user as any).membershipType === "basic"
                            ? "secondary"
                            : "gold"
                        }
                      >
                        {(user as any).membershipType || "--"}
                      </Badge>
                      <Status
                        className="text-[14px] py-1 px-2 rounded-[8px]"
                        status={user.status}
                        passedTextNode={
                          (user as any).active
                            ? "Active"
                            : !(user as any).active
                            ? "Inactive"
                            : "Unknown"
                        }
                      />
                    </>
                  ) : (
                    <Status
                      className="text-[14px] py-1 px-2 rounded-[8px]"
                      status={user.status}
                    />
                  )}
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-5 h-auto mb-auto">
                <ul className="grid grid-cols-2 gap-6">
                  <UserDetailBlock
                    label="Email"
                    value={user.email}
                    icon={
                      <Icon
                        icon="majesticons:mail"
                        className="text-accent text-lg"
                      />
                    }
                  />
                  <UserDetailBlock
                    label="Address"
                    value={user.address || "Not specified"}
                    icon={
                      <Icon
                        icon="tdesign:location-filled"
                        className="text-accent text-lg"
                      />
                    }
                  />

                  <UserDetailBlock
                    label={role === "member" ? "Joined Date" : "Hired Date"}
                    value={formatTime(user?.joinDate, "MMM dd, yyyy")}
                    icon={
                      <Icon
                        icon="lets-icons:date-fill"
                        className="text-accent text-lg"
                      />
                    }
                  />
                  {user.role === "member" && (
                    <UserDetailBlock
                      label="Renewal Date"
                      value={formatTime(
                        (user as any)?.renewalDate,
                        "MMM dd, yyyy"
                      )}
                      icon={
                        <Icon
                          icon="lets-icons:date-fill"
                          className="text-accent text-lg"
                        />
                      }
                    />
                  )}
                  <UserDetailBlock
                    label="Phone Number"
                    value={user.phoneNumber}
                    icon={
                      <Icon
                        icon="mingcute:phone-fill"
                        className="text-accent text-lg"
                      />
                    }
                  />
                  <UserDetailBlock
                    label="Gender"
                    value={user.gender || "Not specified"}
                    className="capitalize"
                    icon={
                      <Icon
                        icon="ph:gender-male-bold"
                        className="text-accent text-lg"
                      />
                    }
                  />

                  <UserDetailBlock
                    label="Birth Date"
                    value={
                      user?.birthDate
                        ? formatTime(user?.birthDate, "MMM dd, yyyy")
                        : "Not specified"
                    }
                    icon={
                      <Icon
                        icon="lets-icons:date-fill"
                        className="text-accent text-lg"
                      />
                    }
                  />
                </ul>
              </div>
              {edit && (
                <DialogFooter
                  className={cn(
                    user.role === "member" &&
                      "absolute bottom-[12px] right-[12px]"
                  )}
                >
                  <Button
                    variant={"primary"}
                    onClick={() => setOpenEdit?.(true)}
                    className={"py-1.5 font-medium px-6"}
                  >
                    Edit
                  </Button>
                </DialogFooter>
              )}
            </article>
          </div>
        )}

        {/* Just to remove the accessibility bug */}
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
