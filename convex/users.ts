import {v} from "convex/values";
import { mutation ,query} from "./_generated/server";

export const syncUser=mutation({
    args:{
         name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        image: v.optional(v.string()),
    },
    handler: async(ctx ,args)=>{
        const existingUser=await ctx.db.query("users")
        .filter(q=>q.eq(q.field("clerkId"),args.clerkId)).first();
        if(existingUser) return 

        await ctx.db.insert("users",{
            ...args,
            role: "candidate" // Default role, will be updated in the role selection page
        });
    },
});

// Add this new mutation
export const updateUserRole=mutation({
    args: {
        clerkId: v.string(),
        role: v.union(v.literal("candidate"), v.literal("interviewer"))
    },
    handler: async(ctx, args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        
        const clerkId = args.clerkId;
        const existingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", q => q.eq("clerkId", clerkId))
            .first();
            
        if (existingUser) {
            // User exists, update their role
            await ctx.db.patch(existingUser._id, {
                role: args.role
            });
            return existingUser._id;
        } else {
            // User doesn't exist yet, create them with the selected role
            // Get user details from Clerk via the identity
            const name = identity.name || "";
            const email = identity.email || "";
            const image = identity.pictureUrl;
            
            // Create a new user with the selected role
            const userId = await ctx.db.insert("users", {
                name,
                email,
                clerkId,
                role: args.role,
                image
            });
            
            return userId;
        }
    }
});

export const getUsers=query({
    handler: async(ctx)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("User is not authenticated");
        const users= await ctx.db.query("users").collect();
        return users;
    },
});

export const getUserByClerkId=query({
    args: {clerkId: v.string()},
    handler: async(ctx,args)=>{
        const user=await ctx.db
        .query("users")
        .withIndex("by_clerk_id",(q)=>q.eq("clerkId",args.clerkId))
        .first();
        return user;
    },
});