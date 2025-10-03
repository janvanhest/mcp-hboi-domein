#!/usr/bin/env node

/**
 * HBOI MCP Server
 *
 * A Model Context Protocol server for HBOI (HBO-i) domain expertise.
 * Provides tools and resources for HBO-i related queries and operations.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { HboiService } from './services/hboiService.js';
import type { HBOIDomeinbeschrijvingCanoniekeDataset } from './types/hboi.types.js';

// Global HBOI service instance
let hboiService: HboiService | null = null;

/**
 * Available tools for the HBOI MCP Server
 */
const TOOLS: Tool[] = [
  {
    name: 'validate_hboi_data',
    description: 'Validate data against HBOI JSON schema',
    inputSchema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'The data to validate against HBOI schema',
        },
      },
      required: ['data'],
    },
  },
  {
    name: 'get_hboi_info',
    description: 'Get information about HBOI domain and capabilities',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Specific topic to get information about',
          enum: ['overview', 'schema', 'validation', 'tools', 'stats'],
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'get_beroepstaken',
    description: 'Get beroepstaken (professional tasks) from HBOI data',
    inputSchema: {
      type: 'object',
      properties: {
        activiteit_id: {
          type: 'string',
          description: 'Filter by activiteit ID',
          enum: ['act.analyseren', 'act.adviseren', 'act.ontwerpen', 'act.realiseren', 'act.manage_control'],
        },
        architectuurlaag_id: {
          type: 'string',
          description: 'Filter by architectuurlaag ID',
          enum: ['arch.gebruikersinteractie', 'arch.organisatieprocessen', 'arch.infrastructuur', 'arch.software', 'arch.hardware_interfacing'],
        },
        beheersingsniveau_id: {
          type: 'integer',
          description: 'Filter by beheersingsniveau ID',
          minimum: 1,
          maximum: 4,
        },
      },
    },
  },
         {
           name: 'search_hboi',
           description: 'Search in HBOI data',
           inputSchema: {
             type: 'object',
             properties: {
               query: {
                 type: 'string',
                 description: 'Search query',
               },
               section: {
                 type: 'string',
                 description: 'Specific section to search in',
                 enum: ['beheersingsniveaus', 'activiteiten', 'architectuurlagen', 'professional_skills', 'beroepstaken'],
               },
             },
             required: ['query'],
           },
         },
         {
           name: 'get_activiteiten',
           description: 'Get all activiteiten (activities) from HBOI data',
           inputSchema: {
             type: 'object',
             properties: {},
           },
         },
         {
           name: 'get_architectuurlagen',
           description: 'Get all architectuurlagen (architecture layers) from HBOI data',
           inputSchema: {
             type: 'object',
             properties: {},
           },
         },
         {
           name: 'get_beheersingsniveaus',
           description: 'Get all beheersingsniveaus (proficiency levels) from HBOI data',
           inputSchema: {
             type: 'object',
             properties: {},
           },
         },
         {
           name: 'get_competenties_for_activiteit',
           description: 'Get competenties (competencies) related to a specific activiteit',
           inputSchema: {
             type: 'object',
             properties: {
               activiteit_id: {
                 type: 'string',
                 description: 'Activiteit ID to get competencies for',
                 enum: ['act.analyseren', 'act.adviseren', 'act.ontwerpen', 'act.realiseren', 'act.manage_control'],
               },
             },
             required: ['activiteit_id'],
           },
         },
         {
           name: 'filter_beroepstaken',
           description: 'Filter beroepstaken based on multiple criteria',
           inputSchema: {
             type: 'object',
             properties: {
               activiteit_id: {
                 type: 'string',
                 description: 'Filter by activiteit ID',
                 enum: ['act.analyseren', 'act.adviseren', 'act.ontwerpen', 'act.realiseren', 'act.manage_control'],
               },
               architectuurlaag_id: {
                 type: 'string',
                 description: 'Filter by architectuurlaag ID',
                 enum: ['arch.gebruikersinteractie', 'arch.organisatieprocessen', 'arch.infrastructuur', 'arch.software', 'arch.hardware_interfacing'],
               },
               beheersingsniveau_id: {
                 type: 'integer',
                 description: 'Filter by beheersingsniveau ID',
                 minimum: 1,
                 maximum: 4,
               },
               kwaliteitseisen: {
                 type: 'array',
                 items: {
                   type: 'string',
                   enum: ['security', 'privacy', 'duurzaamheid', 'budget', 'tijd', 'performance', 'toegankelijkheid', 'compliance'],
                 },
                 description: 'Filter by kwaliteitseisen (quality requirements)',
               },
             },
           },
         },
         {
           name: 'get_progression_path',
           description: 'Get progression path between two beroepstaken',
           inputSchema: {
             type: 'object',
             properties: {
               from_activiteit_id: {
                 type: 'string',
                 description: 'Source activiteit ID',
                 enum: ['act.analyseren', 'act.adviseren', 'act.ontwerpen', 'act.realiseren', 'act.manage_control'],
               },
               from_architectuurlaag_id: {
                 type: 'string',
                 description: 'Source architectuurlaag ID',
                 enum: ['arch.gebruikersinteractie', 'arch.organisatieprocessen', 'arch.infrastructuur', 'arch.software', 'arch.hardware_interfacing'],
               },
               from_beheersingsniveau_id: {
                 type: 'integer',
                 description: 'Source beheersingsniveau ID',
                 minimum: 1,
                 maximum: 4,
               },
               to_activiteit_id: {
                 type: 'string',
                 description: 'Target activiteit ID',
                 enum: ['act.analyseren', 'act.adviseren', 'act.ontwerpen', 'act.realiseren', 'act.manage_control'],
               },
               to_architectuurlaag_id: {
                 type: 'string',
                 description: 'Target architectuurlaag ID',
                 enum: ['arch.gebruikersinteractie', 'arch.organisatieprocessen', 'arch.infrastructuur', 'arch.software', 'arch.hardware_interfacing'],
               },
               to_beheersingsniveau_id: {
                 type: 'integer',
                 description: 'Target beheersingsniveau ID',
                 minimum: 1,
                 maximum: 4,
               },
             },
             required: ['from_activiteit_id', 'from_architectuurlaag_id', 'from_beheersingsniveau_id', 'to_activiteit_id', 'to_architectuurlaag_id', 'to_beheersingsniveau_id'],
           },
         },
];

/**
 * Create and configure the MCP server
 */
function createServer(): Server {
  const server = new Server(
    {
      name: 'hboi-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Handle tool listing
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: TOOLS,
    };
  });

  // Handle tool execution
  server.setRequestHandler(CallToolRequestSchema, async request => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'validate_hboi_data':
          return await handleValidateData(args as { data: unknown });

        case 'get_hboi_info':
          return await handleGetInfo(args as { topic: string });

        case 'get_beroepstaken':
          return await handleGetBeroepstaken(args as { 
            activiteit_id?: string; 
            architectuurlaag_id?: string; 
            beheersingsniveau_id?: number; 
          });

               case 'search_hboi':
                 return await handleSearchHboi(args as { query: string; section?: string });

               case 'get_activiteiten':
                 return await handleGetActiviteiten();

               case 'get_architectuurlagen':
                 return await handleGetArchitectuurlagen();

               case 'get_beheersingsniveaus':
                 return await handleGetBeheersingsniveaus();

               case 'get_competenties_for_activiteit':
                 return await handleGetCompetentiesForActiviteit(args as { activiteit_id: string });

               case 'filter_beroepstaken':
                 return await handleFilterBeroepstaken(args as {
                   activiteit_id?: string;
                   architectuurlaag_id?: string;
                   beheersingsniveau_id?: number;
                   kwaliteitseisen?: Array<'security' | 'privacy' | 'duurzaamheid' | 'budget' | 'tijd' | 'performance' | 'toegankelijkheid' | 'compliance'>;
                 });

               case 'get_progression_path':
                 return await handleGetProgressionPath(args as {
                   from_activiteit_id: string;
                   from_architectuurlaag_id: string;
                   from_beheersingsniveau_id: number;
                   to_activiteit_id: string;
                   to_architectuurlaag_id: string;
                   to_beheersingsniveau_id: number;
                 });

               default:
                 throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [
          {
            type: 'text',
            text: `Error executing tool ${name}: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

/**
 * Handle data validation against HBOI schema
 */
async function handleValidateData(args: { data: unknown }): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  if (!hboiService) {
    throw new Error('HBOI Service not initialized');
  }

  try {
    const result = hboiService.validateAndCache(args.data, 'validation_data');

    if (result.isValid) {
      return {
        content: [
          {
            type: 'text',
            text: 'Data is valid according to HBOI schema',
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: 'text',
            text: `Validation failed: ${result.errorMessage}`,
          },
        ],
      };
    }
  } catch (error) {
    throw new Error(
      `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Handle information requests about HBOI
 */
async function handleGetInfo(args: { topic: string }): Promise<{
  content: Array<{ type: string; text: string }>;
}> {
  const { topic } = args;

  if (!hboiService) {
    throw new Error('HBOI Service not initialized');
  }

  const infoMap: Record<string, string> = {
    overview:
      'HBOI MCP Server provides domain expertise and validation tools for HBO-i related data and operations.',
    schema:
      'The server uses JSON Schema validation to ensure data compliance with HBOI standards.',
    validation:
      'Data validation is performed using AJV (Another JSON Schema Validator) with format extensions.',
    tools: `Available tools: ${TOOLS.map(t => t.name).join(', ')}`,
    stats: JSON.stringify(hboiService.getCacheStats(), null, 2),
  };

  const info = infoMap[topic];
  if (!info) {
    throw new Error(
      `Unknown topic: ${topic}. Available topics: ${Object.keys(infoMap).join(', ')}`
    );
  }

  return {
    content: [
      {
        type: 'text',
        text: info,
      },
    ],
  };
}

/**
 * Handle getting beroepstaken with optional filters
 */
async function handleGetBeroepstaken(args: { 
  activiteit_id?: string; 
  architectuurlaag_id?: string; 
  beheersingsniveau_id?: number; 
}): Promise<{
  content: Array<{ type: string; text: string }>;
}> {
  if (!hboiService) {
    throw new Error('HBOI Service not initialized');
  }

  try {
    const data = await hboiService.getData();
    if (!data || !data.beroepstaken) {
      return {
        content: [
          {
            type: 'text',
            text: 'No beroepstaken data available',
          },
        ],
      };
    }

    let filteredTasks = data.beroepstaken;

    // Apply filters
    if (args.activiteit_id) {
      filteredTasks = filteredTasks.filter((task: any) => task.activiteit_id === args.activiteit_id);
    }
    if (args.architectuurlaag_id) {
      filteredTasks = filteredTasks.filter((task: any) => task.architectuurlaag_id === args.architectuurlaag_id);
    }
    if (args.beheersingsniveau_id) {
      filteredTasks = filteredTasks.filter((task: any) => task.beheersingsniveau_id === args.beheersingsniveau_id);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Found ${filteredTasks.length} beroepstaken:\n\n${JSON.stringify(filteredTasks, null, 2)}`,
        },
      ],
    };
  } catch (error) {
    throw new Error(`Failed to get beroepstaken: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Handle searching in HBOI data
 */
async function handleSearchHboi(args: { query: string; section?: string }): Promise<{
  content: Array<{ type: string; text: string }>;
}> {
  if (!hboiService) {
    throw new Error('HBOI Service not initialized');
  }

  try {
    const results = await hboiService.search(args.query, args.section as keyof HBOIDomeinbeschrijvingCanoniekeDataset);
    
    return {
      content: [
        {
          type: 'text',
          text: `Search results for "${args.query}"${args.section ? ` in ${args.section}` : ''}:\n\nFound ${results.length} results:\n\n${JSON.stringify(results, null, 2)}`,
        },
      ],
    };
         } catch (error) {
           throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle getting all activiteiten
        */
       async function handleGetActiviteiten(): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const activiteiten = dataService.getActiviteiten();

           return {
             content: [
               {
                 type: 'text',
                 text: `Found ${activiteiten.length} activiteiten:\n\n${JSON.stringify(activiteiten, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to get activiteiten: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle getting all architectuurlagen
        */
       async function handleGetArchitectuurlagen(): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const architectuurlagen = dataService.getArchitectuurlagen();

           return {
             content: [
               {
                 type: 'text',
                 text: `Found ${architectuurlagen.length} architectuurlagen:\n\n${JSON.stringify(architectuurlagen, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to get architectuurlagen: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle getting all beheersingsniveaus
        */
       async function handleGetBeheersingsniveaus(): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const beheersingsniveaus = dataService.getBeheersingsniveaus();

           return {
             content: [
               {
                 type: 'text',
                 text: `Found ${beheersingsniveaus.length} beheersingsniveaus:\n\n${JSON.stringify(beheersingsniveaus, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to get beheersingsniveaus: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle getting competenties for activiteit
        */
       async function handleGetCompetentiesForActiviteit(args: { activiteit_id: string }): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const competenties = dataService.getCompetenciesForActivity(args.activiteit_id);

           return {
             content: [
               {
                 type: 'text',
                 text: `Found ${competenties.length} competenties for activiteit ${args.activiteit_id}:\n\n${JSON.stringify(competenties, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to get competenties for activiteit: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle filtering beroepstaken
        */
       async function handleFilterBeroepstaken(args: {
         activiteit_id?: string;
         architectuurlaag_id?: string;
         beheersingsniveau_id?: number;
         kwaliteitseisen?: Array<'security' | 'privacy' | 'duurzaamheid' | 'budget' | 'tijd' | 'performance' | 'toegankelijkheid' | 'compliance'>;
       }): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const filteredBeroepstaken = dataService.filterBeroepstaken(args);

           return {
             content: [
               {
                 type: 'text',
                 text: `Found ${filteredBeroepstaken.length} beroepstaken matching criteria:\n\n${JSON.stringify(filteredBeroepstaken, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to filter beroepstaken: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

       /**
        * Handle getting progression path
        */
       async function handleGetProgressionPath(args: {
         from_activiteit_id: string;
         from_architectuurlaag_id: string;
         from_beheersingsniveau_id: number;
         to_activiteit_id: string;
         to_architectuurlaag_id: string;
         to_beheersingsniveau_id: number;
       }): Promise<{
         content: Array<{ type: string; text: string }>;
       }> {
         if (!hboiService) {
           throw new Error('HBOI Service not initialized');
         }

         try {
           const dataService = hboiService.getDataService();
           const progressionPath = dataService.getProgressionPath(
             args.from_activiteit_id,
             args.from_architectuurlaag_id,
             args.from_beheersingsniveau_id,
             args.to_activiteit_id,
             args.to_architectuurlaag_id,
             args.to_beheersingsniveau_id
           );

           if (!progressionPath) {
             return {
               content: [
                 {
                   type: 'text',
                   text: 'No progression path found between the specified beroepstaken.',
                 },
               ],
             };
           }

           return {
             content: [
               {
                 type: 'text',
                 text: `Progression path found:\n\n${JSON.stringify(progressionPath, null, 2)}`,
               },
             ],
           };
         } catch (error) {
           throw new Error(`Failed to get progression path: ${error instanceof Error ? error.message : 'Unknown error'}`);
         }
       }

/**
 * Main server startup
 */
async function main(): Promise<void> {
  console.error('Starting HBOI MCP Server...');
  
  try {
    // Initialize HBOI service
    hboiService = new HboiService({
      enableCaching: true,
      cache: {
        enableLogging: true,
        defaultTTL: 10 * 60 * 1000, // 10 minutes
      },
    });
    
    await hboiService.initialize();
    console.error('✅ HBOI Service initialized successfully');
    
    // Create and start MCP server
    const server = createServer();
    const transport = new StdioServerTransport();
    
    await server.connect(transport);
    console.error('✅ HBOI MCP Server started successfully');
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

export { createServer, main };
