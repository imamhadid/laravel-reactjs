<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Http\Response;

/**
 * @OA\Schema(
 *     schema="User",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="password", type="string"),
 * )
 * @OA\Schema(
 *     schema="bodyUser",
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="password", type="string"),
 * )
 */

class UserController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get a list of all users.
     *
     * @OA\Get(
     *     path="/users",
     *     tags={"Users"},
     *     summary="Get a list of all users",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User")),
     *     ),
     * )
     *
     * @return Response
     */

    public function index()
    {
        $users = $this->userRepository->all();

        return response()->json(['users' => $users]);
    }

    /**
     * Get a specific user by ID.
     *
     * @OA\Get(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Get a specific user by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *     ),
     * )
     *
     * @param int $id
     * @return Response
     */

    public function userFind($id)
    {
        $users = $this->userRepository->find($id);

        return response()->json(['users' => $users]);
    }


    /**
     * Create a new user.
     *
     * @OA\Post(
     *     path="/users",
     *     tags={"Users"},
     *     summary="Create a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/bodyUser")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     ),
     * )
     *
     * @param Request $request
     * @return Response
     */

    public function createUser(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:8',
        ]);


        $user = $this->userRepository->create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json(['user' => $user], 201);
    }

    /**
     * Update a user by ID.
     *
     * @OA\Put(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Update a user by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/bodyUser")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     ),
     * )
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */

    public function updateUser(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        $user = $this->userRepository->update($id, [
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => isset($validatedData['password']) ? bcrypt($validatedData['password']) : null,
        ]);

        if ($user) {
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    /**
     * Delete a user by ID.
     *
     * @OA\Delete(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Delete a user by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User deleted successfully",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *     ),
     * )
     *
     * @param int $id
     * @return Response
     */

    public function deleteUser($id)
    {

        $result = $this->userRepository->delete($id);

        if ($result) {
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

}
