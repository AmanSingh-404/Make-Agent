import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateAgent = mutation({
    args: {
        name: v.string(),
        agentId: v.string(),
        userId:v.id('UserTable')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('AgentTable', {
            name: args.name,
            agentId: args.agentId,
            published: false,
            userId:args.userId

        })
        return result;
    }
})