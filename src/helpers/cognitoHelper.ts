import { CognitoIdentityServiceProvider } from "aws-sdk";

export const getCognitoIDByEmail = async (email: string) => {
	try {
		const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
		const params = { UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || "", Filter: `email = "${email}"`, Limit: 1 };

		const response = await cognitoIdentityServiceProvider.listUsers(params).promise();
		const users = response.Users;

		if (!users?.length || !users[0].Username) return;
		return users[0].Username;
	} catch (error) {
		console.log("Помилка при отриманні cognitoID:", error);
	}
};

export const getEmailByCognitoID = async (cognitoID: string) => {
	const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
	const params = { UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || "", Filter: `sub = "${cognitoID}"`, Limit: 1 };

	try {
		const response = await cognitoIdentityServiceProvider.listUsers(params).promise();
		const users = response.Users;

		if (!users?.length || !users[0].Attributes) return;
		return users[0].Attributes?.find(attr => attr.Name === "email")?.Value;
	} catch (error) {
		console.error("Помилка при отриманні email:", error);
	}
};
