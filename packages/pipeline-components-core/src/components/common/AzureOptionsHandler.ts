// AzureOptionsHandler.ts

export class AzureOptionsHandler {

    public static handleAZBptions(config, storageOptions): object {
        if (config.fileLocation === 'azb' && config.connectionMethod === 'storage_options') {
            return {
                ...storageOptions, // Preserve any manually added storageOptions
                service_account_file: config.gcsServiceAccountFilePath,
                account_name : "",
                account_key : "",
                container_name : ""
            };
        }
        return storageOptions;
    }

    public static getAZBFields(): object[] {
        return [
          {
            type: "select",
            label: "Connection Method",
            id: "connectionMethod",
            options: [
              { value: "env", label: "Environment Variables (Recommended)", tooltip: "Use AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables, using an Env. Variable File is recommended." },
              { value: "storage_options", label: "Pass directly (storage_options)", tooltip: "You can pass credentials using the storage_options parameter. Using Environment Variables for this method is also recommended." }
            ],
            condition: { fileLocation: "azb" },
            connection: "AZB",
            ignoreConnection: true,
            advanced: true
          },
          {
            type: "input",
            label: "Access Key",
            id: "azbAccessKey",
            placeholder: "Enter Access Key",
            inputType: "password",
            connection: "AZB",
            connectionVariableName: "AZB_ACCESS_KEY_ID",
            condition: { fileLocation: "azb", connectionMethod: "storage_options" },
            advanced: true
          },
          {
            type: "input",
            label: "Secret Key",
            id: "azbSecretKey",
            placeholder: "Enter Secret Key",
            inputType: "password",
            connection: "AZB",
            connectionVariableName: "AZB_SECRET_ACCESS_KEY",
            condition: { fileLocation: "azb", connectionMethod: "storage_options" },
            advanced: true
          }
        ];
      }
  }