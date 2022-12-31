import {User} from "@prisma/client";
import {IChangeTypeOfKeys} from "~/types/IChangeTypeOfKeys";


type ISafeUserSelect = Partial<IChangeTypeOfKeys<User, boolean>>
export const safeUserSelect /*:ISafeUserSelect*/ = {
    userName: true,
    image: true
}

